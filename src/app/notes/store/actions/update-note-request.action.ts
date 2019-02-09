import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class UpdateNoteRequestAction implements Action {
  readonly type = NoteActionTypes.UpdateNoteRequest;

  constructor(
    public id: number,
    public text: string,
  ) { }
}
