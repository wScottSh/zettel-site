const fs = require('fs');
const path = require('path');
const os = require('os');

// Use fixed path to zettelkasten directory
const notesDir = path.join(os.homedir(), 'repos/scott-brain-md/zettelkasten');
const outputFile = path.join(__dirname, '../src/data/notesDatabase.js');

const files = fs.readdirSync(notesDir).filter(file => file.endsWith('.md'));
const notes = {};

files.forEach(file => {
  const filePath = path.join(notesDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  const match = file.match(/^(\d+)\s+(.*)\.md$/);
  if (match) {
    const id = match[1];
    const title = match[2];
    notes[id] = {
      id,
      title,
      content
    };
  }
});

const data = `// Generated by scripts/generateNotes.js
export const NOTES_DATABASE = ${JSON.stringify(notes, null, 2)};
`;

fs.writeFileSync(outputFile, data);
console.log(`Generated notesDatabase.js with ${Object.keys(notes).length} notes.`);