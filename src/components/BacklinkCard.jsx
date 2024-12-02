// src/components/BacklinkCard.jsx
import React from 'react';

function BacklinkCard({ id, title, excerpt }) {
  const formattedExcerpt = excerpt.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  return (
    <div className="backlink-card">
      <h3><a href={`?note=${id}`}>{title}</a></h3>
      <p dangerouslySetInnerHTML={{ __html: formattedExcerpt }} />
    </div>
  );
}

export default BacklinkCard;