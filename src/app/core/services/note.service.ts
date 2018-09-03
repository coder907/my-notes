import { Injectable } from '@angular/core';

import {
  Store,
  select,
} from '@ngrx/store';

import { Observable } from 'rxjs';

import { Note } from '../models/note';

import {
  SyncAction,
  AddRequestAction,
  UpdateRequestAction,
  RemoveRequestAction,
} from '../store/note';

import * as fromCoreStore from '../store';



@Injectable({
  providedIn: 'root',
})
export class NoteService {

  private __editedNoteId: string = null;

  private __notes$: Observable<Note[]>;

  constructor(
    private __store: Store<fromCoreStore.State>
  ) {}

  startSync(): void {
    this.__store.dispatch(new SyncAction());
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
    this.__store.dispatch(new AddRequestAction(new Date().getTime(), text));
  }

  updateNote(id: string, text: string): void {
    this.__store.dispatch(new UpdateRequestAction(id, new Date().getTime(), text));
  }

  removeNote(id: string): void {
    this.__store.dispatch(new RemoveRequestAction(id));
  }

  addOrUpdateNote(text: string) {
    if (this.__editedNoteId) {
      this.updateNote(this.__editedNoteId, text);

    } else {
      this.addNote(text);
    }
  }
  startEditing(id: string) {
    this.__editedNoteId = id;
  }

  stopEditing() {
    this.__editedNoteId = null;
  }

  removeEditedNote() {
    if (this.__editedNoteId) {
      this.removeNote(this.__editedNoteId);
      this.stopEditing();
    }
  }

  get editedNote$() {
    if (this.__editedNoteId) {
      return this.getNote(this.__editedNoteId);

    } else {
      return null;
    }
  }
}
