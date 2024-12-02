// src/components/BacklinkCard.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { insertNoteAfterPosition } from '../utils/noteNavigation';

function BacklinkCard({ id, title, excerpt, position }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const formattedExcerpt = excerpt.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  const handleClick = (e) => {
    e.preventDefault();
    const currentNotes = searchParams.getAll('note');
    const updatedNotes = currentNotes.slice(0, position + 1);
    updatedNotes.push(id);
    setSearchParams({ note: updatedNotes });
  };

  return (
    <div className="backlink-card" onClick={handleClick} role="button" tabIndex={0}>
      <h3>{title}</h3>
      <p dangerouslySetInnerHTML={{ __html: formattedExcerpt }} />
    </div>
  );
}

export default BacklinkCard;