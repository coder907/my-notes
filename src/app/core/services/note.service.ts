import { Injectable } from '@angular/core';

import {
  Store,
  select,
} from '@ngrx/store';

import { Observable } from 'rxjs';

import { Note } from '../models/note';

import {
  AddRequestAction,
  UpdateRequestAction,
  RemoveRequestAction,
} from '../store/note';

import * as fromCoreStore from '../store';



@Injectable({
  providedIn: 'root',
})
export class NoteService {

  private __notes$: Observable<Note[]>;

  constructor(private store: Store<fromCoreStore.State>) {}

  getNotes(): Observable<Note[]> {
    if (!this.__notes$) {
      this.__notes$ = this.store.pipe(select(fromCoreStore.getAllNotes));
    }
    return this.__notes$;
  }

  getNote(id: string): Observable<Note> {
    return this.store.pipe(select(fromCoreStore.getNote(id)));
  }

  addNote(text: string): void {
    this.store.dispatch(new AddRequestAction(new Date().getTime(), text));
  }

  updateNote(id: string, text: string): void {
    this.store.dispatch(new UpdateRequestAction(id, new Date().getTime(), text));
  }

  removeNote(id: string): void {
    this.store.dispatch(new RemoveRequestAction(id));
  }
}
