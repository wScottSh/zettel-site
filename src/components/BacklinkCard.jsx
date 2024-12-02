// src/components/BacklinkCard.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

function BacklinkCard({ id, title, excerpt }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const formattedExcerpt = excerpt.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  const handleClick = (e) => {
    e.preventDefault();
    const currentNotes = searchParams.getAll('note');
    setSearchParams({ note: [...currentNotes, id] });
  };

  return (
    <div className="backlink-card">
      <h3><a href="#" onClick={handleClick} className="note-link">{title}</a></h3>
      <p dangerouslySetInnerHTML={{ __html: formattedExcerpt }} />
    </div>
  );
}

export default BacklinkCard;