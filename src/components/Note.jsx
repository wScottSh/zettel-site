// src/components/Note.jsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import BacklinksContainer from './BacklinksContainer';
import { parseLinks } from '../utils/parseLinks';
import { findBacklinks } from '../utils/findBacklinks';
import { insertNoteAfterPosition } from '../utils/noteNavigation';
import { formatNoteDate } from '../utils/dateFormatter';

function Note({ id, title, content, position, noteIds }) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window._handleNoteLinkClick = (noteId) => {
      const currentNotes = searchParams.getAll('note');
      // Explicitly truncate and insert
      const updatedNotes = currentNotes.slice(0, position + 1);
      updatedNotes.push(noteId);
      setSearchParams({ note: updatedNotes });
    };

    return () => {
      delete window._handleNoteLinkClick;
    };
  }, [searchParams, setSearchParams, position]);

  const handleNoteLinkClick = (noteId) => {
    const currentNotes = noteIds; // Use noteIds passed from NotesContainer
    const updatedNotes = currentNotes.slice(0, position + 1);
    updatedNotes.push(noteId);
    const updatedSearchParams = updatedNotes.slice(1); // Exclude pathNoteId
    setSearchParams({ note: updatedSearchParams });
  };

  const components = {
    link: ({ href, children }) => {
      const match = href.match(/^\[\[(\d+)(?:\s+.*?)?\]\]$/);
      if (match) {
        const noteId = match[1];
        return (
          <a href="#" onClick={() => handleNoteLinkClick(noteId)}>
            {children}
          </a>
        );
      }
      return <a href={href}>{children}</a>;
    },
  };

  const parsedContent = parseLinks(content, handleNoteLinkClick);
  const backlinks = findBacklinks(id);

  return (
    <div className="note">
      <h2>{title}</h2>
      <div className="note-date">Written: {formatNoteDate(id)}</div>
      <div className="note-content">
        <ReactMarkdown components={components}>
          {content}
        </ReactMarkdown>
      </div>
      <BacklinksContainer backlinks={backlinks} position={position} noteIds={noteIds} />
    </div>
  );
}

export default Note;