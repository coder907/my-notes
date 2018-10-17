import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class UpdateNoteFailAction implements Action {
  readonly type = NoteActionTypes.UpdateNoteFail;

  constructor(public error: any) { }
}
