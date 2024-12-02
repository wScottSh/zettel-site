// src/components/Note.jsx
import React from 'react';
import BacklinksContainer from './BacklinksContainer';

function Note({ title, content }) {
  // Sample backlinks data
  const sampleBacklinks = [
    { title: "Note A", excerpt: "Reference to this note in context..." },
    { title: "Note B", excerpt: "Another reference to this note..." },
  ];

  return (
    <div className="note">
      <h2>{title}</h2>
      <div className="note-content">{content}</div>
      <BacklinksContainer backlinks={sampleBacklinks} />
    </div>
  );
}

export default Note;