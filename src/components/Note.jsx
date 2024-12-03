// src/components/Note.jsx
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BacklinksContainer from './BacklinksContainer';
import { findBacklinks } from '../utils/findBacklinks';
import { formatNoteDate } from '../utils/dateFormatter';

function Note({ id, title, content, position, noteIds }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleNoteLinkClick = (noteId) => {
    const currentNotes = noteIds;
    const updatedNotes = currentNotes.slice(0, position + 1);
    updatedNotes.push(noteId);
    const updatedSearchParams = updatedNotes.slice(1);
    setSearchParams({ note: updatedSearchParams });
  };

  const handleDateClick = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1500);
    } catch (err) {
      console.error('Failed to copy ID:', err);
    }
  };

  // Custom remark plugin for wiki-style links
  const remarkWikiLinks = () => (tree) => {
    function visitor(node) {
      if (node.type === 'text' && node.value.includes('[[')) {
        const segments = node.value.split(/(\[\[\d+[^\]]*\]\])/g);
        const children = segments.map(segment => {
          const wikiLink = segment.match(/^\[\[(\d+)(?:\s+([^\]]+))?\]\]$/);
          if (wikiLink) {
            const [_, noteId, linkText] = wikiLink;
            return {
              type: 'link',
              url: `#${noteId}`,
              data: { noteId },
              children: [{
                type: 'text',
                value: linkText || noteId
              }]
            };
          }
          return {
            type: 'text',
            value: segment
          };
        });
        return children;
      }
    }

    const transform = (node) => {
      if (Array.isArray(node.children)) {
        const newChildren = [];
        for (const child of node.children) {
          const result = visitor(child);
          if (Array.isArray(result)) {
            newChildren.push(...result);
          } else if (result) {
            newChildren.push(result);
          } else {
            newChildren.push(child);
          }
          if (child.children) {
            transform(child);
          }
        }
        node.children = newChildren;
      }
    };

    transform(tree);
  };

  const components = {
    a: ({ href, children }) => {
      if (href.startsWith('#')) {
        const noteId = href.slice(1);
        return (
          <a
            href="#"
            className="note-link"
            onClick={(e) => {
              e.preventDefault();
              handleNoteLinkClick(noteId);
            }}
          >
            {children}
          </a>
        );
      }
      return <a href={href} className="note-link">{children}</a>;
    }
  };

  const backlinks = findBacklinks(id);

  return (
    <div className="note">
      <h2>{title}</h2>
      <div 
        className="note-date" 
        onClick={handleDateClick}
      >
        Written: {formatNoteDate(id)}
        <div className={`tooltip ${showTooltip ? 'visible' : ''}`}>
          Zettel ID Copied to Clipboard
        </div>
      </div>
      <div className="note-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkWikiLinks]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>
      <BacklinksContainer backlinks={backlinks} position={position} noteIds={noteIds} />
    </div>
  );
}

export default Note;