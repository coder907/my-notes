import {
  Component,
  OnDestroy
} from '@angular/core';

import { NoteService } from '../../services/note.service';



@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
})
export class NotesManagerComponent implements OnDestroy  {

  constructor(
    public noteService: NoteService,
  ) {}

  post(text: string) {
    this.noteService.addOrUpdateNote(text);
  }

  ngOnDestroy() {
    this.noteService.stopEditing();
  }
}
