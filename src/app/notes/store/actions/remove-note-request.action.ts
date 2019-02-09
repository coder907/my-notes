import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class RemoveNoteRequestAction implements Action {
  readonly type = NoteActionTypes.RemoveNoteRequest;

  constructor(public id: number) { }
}
