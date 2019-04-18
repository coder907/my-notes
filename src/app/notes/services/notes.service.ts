import { Injectable } from '@angular/core';

import {
  Store,
  select,
} from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Note } from '../models/note';
import { NotesState } from '../redux/state';

import { SyncNotesRequestAction } from '../redux/actions/sync-notes';
import { AddNoteRequestAction } from '../redux/actions/add-note';
import { UpdateNoteRequestAction } from '../redux/actions/update-note';
import { RemoveNoteRequestAction } from '../redux/actions/remove-note';
import { StartEditingNoteAction } from '../redux/actions/editing';
import { StopEditingNoteAction } from '../redux/actions/editing';

import * as selectors from '../redux/selectors';



@Injectable({
  providedIn: 'root',
})
export class NotesService {

  private notesValue$: Observable<Note[]>;
  private editedNoteValue$: Observable<Note>;

  constructor(
    private readonly store: Store<NotesState>
  ) { }

  get notes$(): Observable<Note[]> {
    if (!this.notesValue$) {
      this.notesValue$ = this.store.pipe(select(selectors.getAllNotes));
    }
    return this.notesValue$;
  }

  syncNotes(): void {
    this.store.dispatch(new SyncNotesRequestAction());
  }

  getNote(id: string): Observable<Note> {
    return this.store.pipe(select(selectors.getNote(id)));
  }

  addNote(text: string) {
    this.store.dispatch(new AddNoteRequestAction(text));
  }

  updateNote(id: number, text: string) {
    this.store.dispatch(new UpdateNoteRequestAction(id, text));
  }

  removeNote(id: number) {
    this.store.dispatch(new RemoveNoteRequestAction(id));
  }

  addOrUpdateNote(text: string) {
    this.editedNote$.pipe(take(1)).subscribe(
      (editedNote) => {
        if (editedNote) {
          this.updateNote(editedNote.id, text);

        } else {
          this.addNote(text);
        }
      },
      (error) => {
        console.error('Error adding or updating note: ' + error);
      }
    );
  }

  get editedNote$(): Observable<Note> {
    if (!this.editedNoteValue$) {
      this.editedNoteValue$ = this.store.pipe(select(selectors.getEditedNote));
    }

    return this.editedNoteValue$;
  }

  startEditing(id: number) {
    this.store.dispatch(new StartEditingNoteAction(id));
  }

  stopEditing() {
    this.store.dispatch(new StopEditingNoteAction());
  }

  removeEditedNote() {
    this.editedNote$.pipe(take(1)).subscribe(
      (editedNote) => {
        if (editedNote) {
          this.removeNote(editedNote.id);
        }
      },
      (error) => {
        console.error('Error removing edited note: ' + error);
      }
    );
  }
}
