import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class AddNoteFailAction implements Action {
  readonly type = NoteActionTypes.AddNoteFail;

  constructor(public error: any) { }
}
