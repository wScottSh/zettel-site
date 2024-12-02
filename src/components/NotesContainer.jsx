// src/components/NotesContainer.jsx
import React, { useEffect, useRef } from 'react';
import Note from './Note';
import { NOTES_DATABASE } from '../data/notesDatabase';

function NotesContainer({ noteIds }) {
  const containerRef = useRef(null);
  const displayedNotes = noteIds
    .map(id => NOTES_DATABASE[id])
    .filter(note => note !== undefined);

  useEffect(() => {
    if (containerRef.current && displayedNotes.length > 0) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: 'smooth'
      });
    }
  }, [displayedNotes.length]);

  if (displayedNotes.length === 0) {
    return <div>No notes found.</div>;
  }

  return (
    <section className="notes-container" ref={containerRef}>
      {displayedNotes.map((note, index) => (
        <Note 
          key={`${note.id}-${index}`} 
          {...note} 
          position={index}
          noteIds={noteIds} // Pass noteIds to Note
        />
      ))}
    </section>
  );
}

export default NotesContainer;