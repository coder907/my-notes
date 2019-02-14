import { Action } from '@ngrx/store';

import { NotesActionTypes } from '.';



export class UpdateNoteRequestAction implements Action {
  readonly type = NotesActionTypes.UpdateNoteRequest;

  constructor(
    public id: number,
    public text: string,
  ) { }
}

export class UpdateNoteSuccessAction implements Action {
  readonly type = NotesActionTypes.UpdateNoteSuccess;

  constructor(
    public id: number,
    public text: string,
  ) { }
}

export class UpdateNoteFailAction implements Action {
  readonly type = NotesActionTypes.UpdateNoteFail;

  constructor(public error: any) { }
}
