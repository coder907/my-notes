import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class UpdateNoteSuccessAction implements Action {
  readonly type = NoteActionTypes.UpdateNoteSuccess;

  constructor(
    public id: number,
    public text: string,
  ) { }
}
