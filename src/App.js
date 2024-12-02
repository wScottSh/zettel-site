// App.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesContainer from './components/NotesContainer';
import Header from './components/Header';
import './App.css';

function App() {
  const [searchParams] = useSearchParams();
  const noteIds = Array.from(searchParams.getAll('note')); // Get all 'note' parameters

  return (
    <div className="app">
      <Header title="Scott Sheppard's Notes" />
      <NotesContainer noteIds={noteIds} />
    </div>
  );
}

export default App;