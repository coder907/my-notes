import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class AddNoteRequestAction implements Action {
  readonly type = NoteActionTypes.AddNoteRequest;

  constructor(
    public createdTs: number,
    public text: string,
  ) {}
}
