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

import { DataService } from 'src/app/core/services/data/data.service';
import { NoteActionTypes } from '../store/actions';
import { LoadNotesRequestAction } from '../store/actions/load-notes-request.action';
import { LoadNotesSuccessAction } from '../store/actions/load-notes-success.action';
import { LoadNotesFailAction } from '../store/actions/load-notes-fail.action';
import { RemoveNoteRequestAction } from '../store/actions/remove-note-request.action';
import { RemoveNoteSuccessAction } from '../store/actions/remove-note-success.action';
import { RemoveNoteFailAction } from '../store/actions/remove-note-fail.action';
import { AddNoteRequestAction } from '../store/actions/add-note-request.action';
import { AddNoteSuccessAction } from '../store/actions/add-note-success.action';
import { AddNoteFailAction } from '../store/actions/add-note-fail.action';
import { UpdateNoteRequestAction } from '../store/actions/update-note-request.action';
import { UpdateNoteSuccessAction } from '../store/actions/update-note-success.action';
import { UpdateNoteFailAction } from '../store/actions/update-note-fail.action';



@Injectable()
export class NoteEffects {

  constructor(
    private readonly actions: Actions,
    private readonly dataService: DataService,
  ) { }

  @Effect()
  readonly load$: Observable<Action> = this.actions.pipe(
    ofType(NoteActionTypes.LoadNotesRequest),

    concatMap((action: LoadNotesRequestAction) => {
      return this.dataService.loadNotes();
    }),

    map(notes => new LoadNotesSuccessAction(notes)),

    catchError(error => of(new LoadNotesFailAction(error)))
  );

  @Effect()
  readonly add$: Observable<Action> = this.actions.pipe(
    ofType(NoteActionTypes.AddNoteRequest),

    concatMap((action: AddNoteRequestAction) => {
      return this.dataService.addNote(action.text);
    }),

    map(note => new AddNoteSuccessAction(note)),

    catchError(error => of(new AddNoteFailAction(error)))
  );

  @Effect()
  readonly update$: Observable<Action> = this.actions.pipe(
    ofType(NoteActionTypes.UpdateNoteRequest),

    concatMap(async (action: UpdateNoteRequestAction) => {
      await this.dataService.updateNote(action.id, action.text);

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
    ofType(NoteActionTypes.RemoveNoteRequest),

    concatMap(async (action: RemoveNoteRequestAction) => {
      await this.dataService.deleteNote(action.id);
      return action.id;
    }),

    map(id => new RemoveNoteSuccessAction(id)),

    catchError(error => of(new RemoveNoteFailAction(error)))
  );
}
