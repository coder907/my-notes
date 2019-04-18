import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';

import {
  Effect,
  Actions,
  ofType
} from '@ngrx/effects';

import {
  Observable,
  of,
} from 'rxjs';

import {
  map,
  concatMap,
  catchError,
} from 'rxjs/operators';

import { NotesServiceBackendBase } from '../../services/backend/notes-service-backend-base';
// import { NotesServiceBackendMock } from '../../services/backend/notes-service-backend-mock';
import { NotesServiceBackend } from '../../services/backend/notes-service-backend';

import { NotesActionTypes } from '../actions';

import {
  LoadNotesRequestAction,
  LoadNotesSuccessAction,
  LoadNotesFailAction
} from '../actions/load-notes';

import {
  AddNoteRequestAction,
  AddNoteSuccessAction,
  AddNoteFailAction
} from '../actions/add-note';

import {
  UpdateNoteRequestAction,
  UpdateNoteSuccessAction,
  UpdateNoteFailAction
} from '../actions/update-note';

import {
  RemoveNoteRequestAction,
  RemoveNoteSuccessAction,
  RemoveNoteFailAction
} from '../actions/remove-note';



@Injectable()
export class NotesEffects {

  private readonly notesServiceBackend: NotesServiceBackendBase;

  constructor(
    private readonly actions: Actions,
    // notesServiceBackend: NotesServiceBackendMock,
    notesServiceBackend: NotesServiceBackend,
  ) {
    this.notesServiceBackend = notesServiceBackend;
  }

  @Effect()
  readonly load$: Observable<Action> = this.actions.pipe(
    ofType(NotesActionTypes.LoadNotesRequest),

    concatMap((action: LoadNotesRequestAction) => {
      return this.notesServiceBackend.loadNotes();
    }),

    map(notes => new LoadNotesSuccessAction(notes)),

    catchError(error => of(new LoadNotesFailAction(error)))
  );

  @Effect()
  readonly add$: Observable<Action> = this.actions.pipe(
    ofType(NotesActionTypes.AddNoteRequest),

    concatMap((action: AddNoteRequestAction) => {
      return this.notesServiceBackend.addNote(action.text);
    }),

    map(note => new AddNoteSuccessAction(note)),

    catchError(error => of(new AddNoteFailAction(error)))
  );

  @Effect()
  readonly update$: Observable<Action> = this.actions.pipe(
    ofType(NotesActionTypes.UpdateNoteRequest),

    concatMap(async (action: UpdateNoteRequestAction) => {
      await this.notesServiceBackend.updateNote(action.id, action.text);

      return {
        id: action.id,
        text: action.text,
      };
    }),

    map(note => new UpdateNoteSuccessAction(note.id, note.text)),

    catchError(error => of(new UpdateNoteFailAction(error)))
  );

  @Effect()
  readonly remove$: Observable<Action> = this.actions.pipe(
    ofType(NotesActionTypes.RemoveNoteRequest),

    concatMap(async (action: RemoveNoteRequestAction) => {
      await this.notesServiceBackend.deleteNote(action.id);
      return action.id;
    }),

    map(id => new RemoveNoteSuccessAction(id)),

    catchError(error => of(new RemoveNoteFailAction(error)))
  );
}
