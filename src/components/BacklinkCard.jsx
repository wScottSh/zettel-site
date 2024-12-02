// src/components/BacklinkCard.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

function BacklinkCard({ id, title, excerpt }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const formattedExcerpt = excerpt.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  const handleClick = (e) => {
    e.preventDefault();
    const currentNotes = new Set(searchParams.getAll('note'));
    currentNotes.add(id);
    setSearchParams({ note: Array.from(currentNotes) });
  };

  return (
    <div className="backlink-card">
      <h3><a href="#" onClick={handleClick}>{title}</a></h3>
      <p dangerouslySetInnerHTML={{ __html: formattedExcerpt }} />
    </div>
  );
}

export default BacklinkCard;