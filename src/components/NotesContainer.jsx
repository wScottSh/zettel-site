// src/components/NotesContainer.jsx
import React from 'react';
import Note from './Note';
import { NOTES_DATABASE } from '../data/notesDatabase';

function NotesContainer({ noteIds }) {
  const displayedNotes = noteIds
    .map(id => NOTES_DATABASE[id])
    .filter(note => note !== undefined);

  return (
    <section className="notes-container">
      {displayedNotes.map(note => (
        <Note key={note.id} {...note} />
      ))}
    </section>
  );
}

export default NotesContainer;