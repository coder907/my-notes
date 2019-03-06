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

import { NotesDataService } from 'src/app/notes/services/data/notes-data.service';
import { NotesActionTypes } from '../store/actions';

import {
  LoadNotesRequestAction,
  LoadNotesSuccessAction,
  LoadNotesFailAction
} from '../store/actions/load-notes';

import {
  AddNoteRequestAction,
  AddNoteSuccessAction,
  AddNoteFailAction
} from '../store/actions/add-note';

import {
  UpdateNoteRequestAction,
  UpdateNoteSuccessAction,
  UpdateNoteFailAction
} from '../store/actions/update-note';

import {
  RemoveNoteRequestAction,
  RemoveNoteSuccessAction,
  RemoveNoteFailAction
} from '../store/actions/remove-note';



@Injectable()
export class NotesEffects {

  constructor(
    private readonly actions: Actions,
    private readonly notesDataService: NotesDataService,
  ) { }

  @Effect()
  readonly load$: Observable<Action> = this.actions.pipe(
    ofType(NotesActionTypes.LoadNotesRequest),

    concatMap((action: LoadNotesRequestAction) => {
      return this.notesDataService.loadNotes();
    }),

    map(notes => new LoadNotesSuccessAction(notes)),

    catchError(error => of(new LoadNotesFailAction(error)))
  );

  @Effect()
  readonly add$: Observable<Action> = this.actions.pipe(
    ofType(NotesActionTypes.AddNoteRequest),

    concatMap((action: AddNoteRequestAction) => {
      return this.notesDataService.addNote(action.text);
    }),

    map(note => new AddNoteSuccessAction(note)),

    catchError(error => of(new AddNoteFailAction(error)))
  );

  @Effect()
  readonly update$: Observable<Action> = this.actions.pipe(
    ofType(NotesActionTypes.UpdateNoteRequest),

    concatMap(async (action: UpdateNoteRequestAction) => {
      await this.notesDataService.updateNote(action.id, action.text);

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
      await this.notesDataService.deleteNote(action.id);
      return action.id;
    }),

    map(id => new RemoveNoteSuccessAction(id)),

    catchError(error => of(new RemoveNoteFailAction(error)))
  );
}
