// src/components/Note.jsx
import React from 'react';

function Note({ title, content }) {
  return (
    <div className="note">
      <h2>{title}</h2>
      <div className="note-content">{content}</div>
      {/* <div className='backlinks'>{backlinks}</div> */}
    </div>
  );
}

export default Note;