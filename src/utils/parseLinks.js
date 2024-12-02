import React from 'react';

export function parseLinks(content, handleLinkClick) {
  const regex = /\[\[(\d+)\s([^\]]+)\]\]/g;
  let lastIndex = 0;
  const result = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      result.push(content.substring(lastIndex, match.index));
    }
    const id = match[1];
    const title = match[2];
    // Add the link with onClick handler
    result.push(
      <a key={id} onClick={() => handleLinkClick(id)} className="note-link">
        {title}
      </a>
    );
    lastIndex = regex.lastIndex;
  }
  // Add remaining text after the last link
  if (lastIndex < content.length) {
    result.push(content.substring(lastIndex));
  }

  return result;
}