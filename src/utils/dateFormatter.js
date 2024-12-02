
// src/utils/dateFormatter.js

export function formatNoteDate(noteId) {
  const year = noteId.slice(0, 4);
  const month = noteId.slice(4, 6);
  const day = noteId.slice(6, 8);
  const hour = noteId.slice(8, 10);
  const minute = noteId.slice(10, 12);

  const date = new Date(year, month - 1, day, hour, minute);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}