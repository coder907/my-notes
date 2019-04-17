import { Action } from '@ngrx/store';

import { NotesActionTypes } from '../actions';
import { Note } from '../../models/note';



export class LoadNotesRequestAction implements Action {
  readonly type = NotesActionTypes.LoadNotesRequest;
}

export class LoadNotesSuccessAction implements Action {
  readonly type = NotesActionTypes.LoadNotesSuccess;

  constructor(public notes: Note[]) { }
}

export class LoadNotesFailAction implements Action {
  readonly type = NotesActionTypes.LoadNotesFail;

  constructor(public error: any) { }
}
