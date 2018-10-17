import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class AddNoteSuccessAction implements Action {
  readonly type = NoteActionTypes.AddNoteSuccess;
}
