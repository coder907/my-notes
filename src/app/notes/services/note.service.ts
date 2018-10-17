import { Injectable } from '@angular/core';

import {
  Store,
  select,
} from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Note } from '../models/note';
import { NotesState } from '../store/state';

import { SyncNotesAction } from '../store/actions/sync-notes.action';
import { AddNoteRequestAction } from '../store/actions/add-note-request.action';
import { UpdateNoteRequestAction } from '../store/actions/update-note-request.action';
import { RemoveNoteRequestAction } from '../store/actions/remove-note-request.action';
import { StartEditingNoteAction } from '../store/actions/start-editing.action';
import { StopEditingNoteAction } from '../store/actions/stop-editing.action';

import * as selectors from '../store/selectors';



@Injectable({
  providedIn: 'root',
})
export class NoteService {

  private __notes$: Observable<Note[]>;
  private __editedNote$: Observable<Note>;

  constructor(
    private __store: Store<NotesState>
  ) {}

  startSync(): void {
    this.__store.dispatch(new SyncNotesAction());
  }

  get notes$(): Observable<Note[]> {
    if (!this.__notes$) {
      this.__notes$ = this.__store.pipe(select(selectors.getAllNotes));
    }
    return this.__notes$;
  }

  getNote(id: string): Observable<Note> {
    return this.__store.pipe(select(selectors.getNote(id)));
  }

  addNote(text: string): void {
    this.__store.dispatch(new AddNoteRequestAction(new Date().getTime(), text));
  }

  updateNote(id: string, text: string): void {
    this.__store.dispatch(new UpdateNoteRequestAction(id, new Date().getTime(), text));
  }

  removeNote(id: string): void {
    this.__store.dispatch(new RemoveNoteRequestAction(id));
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
    if (!this.__editedNote$) {
      this.__editedNote$ = this.__store.pipe(select(selectors.getEditedNote));
    }

    return this.__editedNote$;
  }

  startEditing(id: string) {
    this.__store.dispatch(new StartEditingNoteAction(id));
  }

  stopEditing() {
    this.__store.dispatch(new StopEditingNoteAction());
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
