// src/components/Note.jsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BacklinksContainer from './BacklinksContainer';
import { parseLinks } from '../utils/parseLinks';
import { findBacklinks } from '../utils/findBacklinks';
import { insertNoteAfterPosition } from '../utils/noteNavigation';

function Note({ id, title, content, position }) {
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
    const currentNotes = searchParams.getAll('note');
    const updatedNotes = currentNotes.slice(0, position + 1);
    updatedNotes.push(noteId);
    setSearchParams({ note: updatedNotes });
  };

  const parsedContent = parseLinks(content, handleNoteLinkClick);
  const backlinks = findBacklinks(id);

  return (
    <div className="note">
      <h2>{title}</h2>
      <div 
        className="note-content"
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
      <BacklinksContainer backlinks={backlinks} position={position} />
    </div>
  );
}

export default Note;