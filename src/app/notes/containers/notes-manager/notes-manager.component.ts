import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { NoteService } from '../../services/note.service';



@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
})
export class NotesManagerComponent implements OnInit, OnDestroy  {

  constructor(
    public noteService: NoteService,
  ) {}

  ngOnInit() {
    this.noteService.startSync();
  }

  post(text: string) {
    this.noteService.addOrUpdateNote(text);
  }

  ngOnDestroy() {
    this.noteService.stopEditing();
  }
}
