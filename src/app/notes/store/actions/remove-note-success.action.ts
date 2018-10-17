import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class RemoveNoteSuccessAction implements Action {
  readonly type = NoteActionTypes.RemoveNoteSuccess;
}
