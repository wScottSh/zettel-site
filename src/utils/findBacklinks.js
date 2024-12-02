import { NOTES_DATABASE } from '../data/notesDatabase';
import { formatPreview } from './formatPreview';

export function findBacklinks(noteId) {
  return Object.values(NOTES_DATABASE)
    .filter(note => {
      const linkPattern = new RegExp(`\\[\\[${noteId}\\s[^\\]]+\\]\\]`);
      return linkPattern.test(note.content);
    })
    .map(note => ({
      id: note.id,
      title: note.title,
      excerpt: formatPreview(note.content)
    }));
}