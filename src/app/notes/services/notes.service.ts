import { Injectable } from '@angular/core';

import {
  Store,
  select,
} from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Note } from '../models/note';
import { NotesState } from '../store/state';

import { LoadNotesRequestAction } from '../store/actions/load-notes';
import { AddNoteRequestAction } from '../store/actions/add-note';
import { UpdateNoteRequestAction } from '../store/actions/update-note';
import { RemoveNoteRequestAction } from '../store/actions/remove-note';
import { StartEditingNoteAction } from '../store/actions/editing';
import { StopEditingNoteAction } from '../store/actions/editing';

import * as selectors from '../store/selectors';



@Injectable({
  providedIn: 'root',
})
export class NotesService {

  private notesValue$: Observable<Note[]>;
  private editedNoteValue$: Observable<Note>;

  constructor(
    private readonly store: Store<NotesState>
  ) { }

  startSync(): void {
    this.store.dispatch(new LoadNotesRequestAction());
  }

  get notes$(): Observable<Note[]> {
    if (!this.notesValue$) {
      this.notesValue$ = this.store.pipe(select(selectors.getAllNotes));
    }
    return this.notesValue$;
  }

  getNote(id: string): Observable<Note> {
    return this.store.pipe(select(selectors.getNote(id)));
  }

  addNote(text: string): void {
    this.store.dispatch(new AddNoteRequestAction(text));
  }

  updateNote(id: number, text: string): void {
    this.store.dispatch(new UpdateNoteRequestAction(id, text));
  }

  removeNote(id: number): void {
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
