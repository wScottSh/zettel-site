// App.jsx
import React from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import NotesContainer from './components/NotesContainer';
import Header from './components/Header';
import './App.css';

function App() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const pathNoteId = location.pathname.slice(1); // Get the note ID from the path

  const noteIds = Array.from(searchParams.getAll('note')); // Get all 'note' parameters

  if (pathNoteId) {
    noteIds.unshift(pathNoteId); // Add the path note ID as the first note
  }

  return (
    <div className="app">
      <Header title="Scott Sheppard's Notes" />
      <NotesContainer noteIds={noteIds} />
    </div>
  );
}

export default App;