import { Component } from '@angular/core';

import { NoteService } from '../../services/note.service';



@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
})
export class NotesManagerComponent  {

  constructor(
    public noteService: NoteService,
  ) {}

  post(text: string) {
    this.noteService.addOrUpdateNote(text);
  }
}
