import { Injectable } from '@angular/core';

import {
  Store,
  select,
} from '@ngrx/store';

import { Observable } from 'rxjs';

import { Note } from '../models/note';

import {
  SyncNotesAction,
  AddNoteRequestAction,
  UpdateNoteRequestAction,
  RemoveNoteRequestAction,
  StartEditingNoteAction,
  StopEditingNoteAction,
} from '../store/note';

import * as fromCoreStore from '../store';



@Injectable({
  providedIn: 'root',
})
export class NoteService {

  private __notes$: Observable<Note[]>;
  private __editedNote$: Observable<Note>;

  constructor(
    private __store: Store<fromCoreStore.State>
  ) {}

  startSync(): void {
    this.__store.dispatch(new SyncNotesAction());
  }

  get notes$(): Observable<Note[]> {
    if (!this.__notes$) {
      this.__notes$ = this.__store.pipe(select(fromCoreStore.getAllNotes));
    }
    return this.__notes$;
  }

  getNote(id: string): Observable<Note> {
    return this.__store.pipe(select(fromCoreStore.getNote(id)));
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
    const subscription = this.editedNote$.subscribe(
      (editedNote) => {
        if (editedNote) {
          this.updateNote(editedNote.id, text);

        } else {
          this.addNote(text);
        }

        subscription.unsubscribe();
      },
      (error) => {
        console.error('Error adding or updating note: ' + error);
        subscription.unsubscribe();
      }
    );
  }

  get editedNote$(): Observable<Note> {
    if (!this.__editedNote$) {
      this.__editedNote$ = this.__store.pipe(select(fromCoreStore.getEditedNote));
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
    const subscription = this.editedNote$.subscribe(
      (editedNote) => {
        if (editedNote) {
          this.removeNote(editedNote.id);
          subscription.unsubscribe();
        }
      },
      (error) => {
        console.error('Error removing edited note: ' + error);
        subscription.unsubscribe();
      }
    );
  }
}
