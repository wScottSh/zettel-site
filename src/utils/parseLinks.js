// src/utils/parseLinks.js
export function parseLinks(content, onNavigate) {
  return content.replace(
    /\[\[(\d+)\s([^\]]+)\]\]/g, 
    (match, id, title) => `<a onclick="window._handleNoteLinkClick('${id}')" class="note-link">${title}</a>`
  );
}