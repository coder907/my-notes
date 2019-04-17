import { Action } from '@ngrx/store';

import { NotesActionTypes } from '../actions';
import { Note } from '../../models/note';



export class AddNoteRequestAction implements Action {
  readonly type = NotesActionTypes.AddNoteRequest;

  constructor(public text: string) { }
}

export class AddNoteSuccessAction implements Action {
  readonly type = NotesActionTypes.AddNoteSuccess;

  constructor(public note: Note) { }
}

export class AddNoteFailAction implements Action {
  readonly type = NotesActionTypes.AddNoteFail;

  constructor(public error: any) { }
}
