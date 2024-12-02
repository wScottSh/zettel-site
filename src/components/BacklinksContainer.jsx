// src/components/BacklinksContainer.jsx
import React from 'react';
import BacklinkCard from './BacklinkCard';

function BacklinksContainer({ backlinks }) {
  if (!backlinks || backlinks.length === 0) return null;

  return (
    <div className="backlinks-container">
      <h3 className="backlinks-title">Referenced in:</h3>
      <div className="backlinks-grid">
        {backlinks.map((backlink, index) => (
          <BacklinkCard key={index} {...backlink} />
        ))}
      </div>
    </div>
  );
}

export default BacklinksContainer;