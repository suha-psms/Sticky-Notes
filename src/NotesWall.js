// NotesWall.js
import Note from './Note.js';

class NotesWall {
  constructor() {
    this.notes = [];
  }

  addNote(text) {
    const note = new Note(text);
    this.notes.push(note);
  }

  editNote(idx, text) {

    this.notes[idx].text = text;
    
  }

  deleteNote(idx) {
    this.notes.splice(idx, 1); 

  }

  getAllNotes() {
    return this.notes;
  }
}

export default NotesWall;

