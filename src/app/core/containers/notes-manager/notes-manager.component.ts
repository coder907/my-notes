import { Component } from '@angular/core';

import { NoteService } from '../../services/note.service';



@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
})
export class NotesManagerComponent  {

  editedNoteId: string = null;

  constructor(
    public noteService: NoteService,
  ) {}

  post(text: string) {
    if (this.editedNoteId) {
      this.noteService.updateNote(this.editedNoteId, text);

    } else {
      this.noteService.addNote(text);
    }
  }

  startEditing(id: string) {
    this.editedNoteId = id;
  }

  stopEditing() {
    this.editedNoteId = null;
  }

  removeEditedNote() {
    if (this.editedNoteId) {
      this.noteService.removeNote(this.editedNoteId);
      this.stopEditing();
    }
  }
}
