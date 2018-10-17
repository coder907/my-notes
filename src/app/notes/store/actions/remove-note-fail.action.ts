import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class RemoveNoteFailAction implements Action {
  readonly type = NoteActionTypes.RemoveNoteFail;

  constructor(public error: any) { }
}
