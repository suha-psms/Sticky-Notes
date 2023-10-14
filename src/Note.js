class Note {
    static nextId = 1;
  
    constructor(text) {
      this.id = Note.nextId++;
      this.text = text;
    }

  }
  
  export default Note;