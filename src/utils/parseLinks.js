
// src/utils/parseLinks.js
export function parseLinks(content) {
  return content.replace(/\[\[(\d+)\s([^\]]+)\]\]/g, '<a href="?note=$1">$2</a>');
}