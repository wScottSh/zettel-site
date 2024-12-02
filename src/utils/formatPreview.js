// src/utils/formatPreview.js
export function formatPreview(content) {
  // First replace links with bold text
  const withBoldLinks = content.replace(/\[\[(\d+)\s([^\]]+)\]\]/g, '**$2**');
  
  // Then truncate
  const truncated = withBoldLinks.substring(0, 100) + '...';
  
  // Only complete bold syntax if there's an odd number of ** sequences
  const starCount = (truncated.match(/\*\*/g) || []).length;
  return starCount % 2 === 1 
    ? truncated.replace(/\.{3}$/, '**...')
    : truncated;
}