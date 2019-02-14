import { Action } from '@ngrx/store';

import { NotesActionTypes } from '.';



export class RemoveNoteRequestAction implements Action {
  readonly type = NotesActionTypes.RemoveNoteRequest;

  constructor(public id: number) { }
}

export class RemoveNoteSuccessAction implements Action {
  readonly type = NotesActionTypes.RemoveNoteSuccess;

  constructor(public id: number) { }
}

export class RemoveNoteFailAction implements Action {
  readonly type = NotesActionTypes.RemoveNoteFail;

  constructor(public error: any) { }
}
