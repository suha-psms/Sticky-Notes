// StickyNotesApp.js
import NotesWall from "./NotesWall.js"

class StickyNotesApp {
    constructor() {
        this.notesWall = new NotesWall();
    }

    handleDoubleClick = (event) => {
      let textArea;
      let noteText;
      let deleteBtn;
  
      const isTextArea = (target) => target.classList.contains("overflow-y-auto") || target.classList.contains("note-text");
  
      if (isTextArea(event.target)) {
          if (event.target.classList.contains("overflow-y-auto")) {
              const noteWall = event.target;
              textArea = noteWall.querySelector(".note-edit");
              noteText = noteWall.querySelector(".note-text");
              deleteBtn = noteWall.querySelector(".delete-btn");
          } else {
              noteText = event.target;
              textArea = noteText.nextElementSibling;
              deleteBtn = noteText.previousElementSibling;
          }
  
          // Hide delete button and text area
          textArea.classList.remove("hidden");
          noteText.classList.add("hidden");
          deleteBtn.classList.add("hidden");
  
          textArea.focus();
  
          const noteId = parseInt(noteText.getAttribute("text_id"));
  
          // Unedit when click away
          const handleBlur = () => {
              noteText.textContent = textArea.value;
              textArea.classList.add("hidden");
              noteText.classList.remove("hidden");
              deleteBtn.classList.remove("hidden");
              textArea.blur();
              this.notesWall.editNote(noteId, textArea.value);
              this.renderNotes();
          };
  
          textArea.addEventListener("blur", handleBlur);
      }
  };
  

   ///handles when the user presses Enter
    handleEditedNoteEnter = (event) => {
      if (event.target.classList.contains("note-edit") && event.key == "Enter" && !event.shiftKey) {
          const textArea = event.target;
          const textIdx = textArea.previousElementSibling;
          const noteIndex = parseInt(textIdx.getAttribute("text_id"));
          const deleteBtn = textIdx.previousElementSibling;
          event.preventDefault();
          textIdx.textContent = textArea.value;

          // hides text area and reveals div and delete
          textArea.classList.add("hidden");
          textIdx.classList.remove("hidden");
          deleteBtn.classList.remove("hidden");
          textArea.blur();
          this.notesWall.editNote(noteIndex, textArea.value);
          this.renderNotes();
      }
  } 

    // delete a note from the notes wall 
    handleTrashButton = (event) =>  { 
      if (event.target.classList.contains("delete-btn"))  {
        const id = event.target.dataset.id; ; 
        this.notesWall.deleteNote(event);
        this.renderNotes(); 
   
      }
  
    }
    // add a stick note to the notes wall
    handleNoteKeyDown(event) {
      if (event.key === 'Enter' && event.target.value.trim() !== "") {
        if(!event.shiftKey) {
          event.preventDefault();
          this.notesWall.addNote(event.target.value.trim()); 
          event.target.value = "";
          this.renderNotes();
        }
      }
    }
    
    renderNotes() {
      const allNotes = this.notesWall.getAllNotes();
      const notesElementWall = document.getElementById("notes-wall"); 
      notesElementWall.innerHTML = "";
  
      allNotes.forEach((note) => {

       // note structure 
        const noteElement = document.createElement('div');
        noteElement.className = "relative w-40 h-40 p-0 m-2 overflow-y-auto transition-transform transform bg-yellow-200 shadow-lg note hover:scale-105"; 
        noteElement.dataset.id = note.id;
        
        // delete button for each note
        const deleteBtn = document.createElement('button');
        deleteBtn.className = "absolute w-5 h-5 leading-5 text-center transition-opacity opacity-0 cursor-pointer delete-btn top-1 right-1 hover:opacity-100"; 
        deleteBtn.textContent = '🗑';
        deleteBtn.dataset.id = note.id; 
      
        // text for each note
        const noteText = document.createElement('div'); 
        noteText.className = "p-4 note-text"; 
        noteText.textContent = note.text; 
        noteText.style.whiteSpace = 'pre-wrap'; 
        noteText.dataset.id = noteText.id; 
        
        // text are for each note 
        const textArea = document.createElement("textarea");
        textArea.className = "absolute top-0 left-0 hidden w-full h-full p-4 transition-transform transform bg-yellow-300 shadow-xl resize-none outline-rose-700 outline-offset-0 note-edit note hover:scale-105";
        textArea.textContent = note.text;
  
        noteElement.appendChild(deleteBtn);
        noteElement.appendChild(noteText);
        noteElement.appendChild(textArea);
        notesElementWall.appendChild(noteElement);
  
      });
    }

    // initializes application and binds event listeners DOM obj to 
    init() {
      document.getElementById('new-note').addEventListener('keydown', this.handleNoteKeyDown.bind(this));
      document.getElementById('notes-wall').addEventListener('click', this.handleTrashButton.bind(this)); 
      document.getElementById('notes-wall').addEventListener('dblclick', this.handleDoubleClick.bind(this));
      document.getElementById('notes-wall').addEventListener('keydown', this.handleEditedNoteEnter.bind(this));
      this.renderNotes();
    }
}
export default StickyNotesApp;
