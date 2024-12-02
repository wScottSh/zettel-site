// src/components/Note.jsx
import React from 'react';
import BacklinksContainer from './BacklinksContainer';
import { parseLinks } from '../utils/parseLinks';

function Note({ id, title, content }) {
  const parsedContent = parseLinks(content);

  return (
    <div className="note">
      <h2>{title}</h2>
      <div 
        className="note-content"
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
      <BacklinksContainer backlinks={[]} />
    </div>
  );
}

export default Note;