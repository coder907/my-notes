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
  defer,
} from 'rxjs';

import {
  map,
  concatMap,
  tap,
  catchError,
} from 'rxjs/operators';

import { DataService } from 'src/app/core/services/data.service';
import { Note } from '../models/note';
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
    private actions: Actions,
    private dataService: DataService,
  ) { }

  @Effect({ dispatch: false })
  init$: Observable<any> = defer(() => of(null)).pipe(
    tap(() => {
      console.log('NoteEffects: init$');
    })
  );

  // @Effect()
  // load$: Observable<Action> = this.actions.pipe(
  //   ofType(NoteActionTypes.AddNoteRequest),

  //   concatMap((action: LoadNotesRequestAction) =>
  //     from(
  //       this.dataService.notes.limit(20).toArray()
  //     )
  //   ),

  //   map(notes => new LoadNotesSuccessAction(notes)),

  //   catchError(error => of(new LoadNotesFailAction(error)))
  // );

  @Effect()
  load$: Observable<Action> = this.actions.pipe(
    ofType(NoteActionTypes.LoadNotesRequest),

    concatMap(async (action: LoadNotesRequestAction) => {
      const notes = await this.dataService.notes.limit(20).toArray();
      return notes;
    }),

    map(notes => new LoadNotesSuccessAction(notes)),

    catchError(error => of(new LoadNotesFailAction(error)))
  );

  @Effect()
  add$: Observable<Action> = this.actions.pipe(
    ofType(NoteActionTypes.AddNoteRequest),

    concatMap(async (action: AddNoteRequestAction) => {
      const note: any = {
        createdTs: action.createdTs,
        text: action.text,
      };

      const id = await this.dataService.notes.add(note as Note);
      note.id = id;

      return note as Note;
    }),

    map(note => new AddNoteSuccessAction(note)),

    catchError(error => of(new AddNoteFailAction(error)))
  );

  @Effect()
  update$: Observable<Action> = this.actions.pipe(
    ofType(NoteActionTypes.UpdateNoteRequest),

    concatMap(async (action: UpdateNoteRequestAction) => {
      const note: Partial<Note> = {
        text: action.text,
      };

      const count = await this.dataService.notes.update(action.id, note);
      note.id = action.id;

      return note;
    }),

    map(note => new UpdateNoteSuccessAction(note.id, note.text)),

    catchError(error => of(new UpdateNoteFailAction(error)))
  );

  @Effect()
  remove$: Observable<Action> = this.actions.pipe(
    ofType(NoteActionTypes.RemoveNoteRequest),

    concatMap(async (action: RemoveNoteRequestAction) => {
      await this.dataService.notes.delete(action.id);
      return action.id;
    }),

    map(id => new RemoveNoteSuccessAction(id)),

    catchError(error => of(new RemoveNoteFailAction(error)))
  );
}
