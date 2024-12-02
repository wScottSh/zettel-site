// src/components/BacklinksContainer.jsx
import React from 'react';
import BacklinkCard from './BacklinkCard';

function BacklinksContainer({ backlinks, position }) {
  if (!backlinks || backlinks.length === 0) return null;

  return (
    <div className="backlinks-container">
      <h3 className="backlinks-title">Referenced in:</h3>
      <div className="backlinks-grid">
        {backlinks.map((backlink, index) => (
          <BacklinkCard
            key={index}
            {...backlink}
            position={position}
          />
        ))}
      </div>
    </div>
  );
}

export default BacklinksContainer;