
// src/utils/formatPreview.js
export function formatPreview(content) {
  return content
    .replace(/\[\[(\d+)\s([^\]]+)\]\]/g, '**$2**')
    .substring(0, 100) + '...';
}