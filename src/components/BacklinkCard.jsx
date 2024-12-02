// src/components/BacklinkCard.jsx
import React from 'react';

function BacklinkCard({ title, excerpt }) {
  return (
    <div className="backlink-card">
      <h3>{title}</h3>
      <p>{excerpt}</p>
    </div>
  );
}

export default BacklinkCard;