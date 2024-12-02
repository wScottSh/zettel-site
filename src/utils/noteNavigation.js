// src/utils/noteNavigation.js

export function insertNoteAfterPosition(currentNotes, newNoteId, position) {
  // Keep notes up to and including the clicked note's position
  const notesToKeep = currentNotes.slice(0, position + 1);
  // Add new note right after
  return [...notesToKeep, newNoteId];
}