// src/components/Note.jsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BacklinksContainer from './BacklinksContainer';
import { parseLinks } from '../utils/parseLinks';
import { findBacklinks } from '../utils/findBacklinks';

function Note({ id, title, content }) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window._handleNoteLinkClick = (noteId) => {
      const currentNotes = new Set(searchParams.getAll('note'));
      currentNotes.add(noteId);
      setSearchParams({ note: Array.from(currentNotes) });
    };

    return () => {
      delete window._handleNoteLinkClick;
    };
  }, [searchParams, setSearchParams]);

  const parsedContent = parseLinks(content);
  const backlinks = findBacklinks(id);

  return (
    <div className="note">
      <h2>{title}</h2>
      <div 
        className="note-content"
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
      <BacklinksContainer backlinks={backlinks} />
    </div>
  );
}

export default Note;