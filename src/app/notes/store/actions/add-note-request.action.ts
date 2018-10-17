import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class AddNoteRequestAction implements Action {
  readonly type = NoteActionTypes.AddNoteRequest;

  constructor(
    public timestamp: number,
    public text: string
  ) {}
}
