import { Action } from '@ngrx/store';

import { NotesActionTypes } from '.';



export class StartEditingNoteAction implements Action {
  readonly type = NotesActionTypes.StartEditingNote;

  constructor(public id: number) { }
}

export class StopEditingNoteAction implements Action {
  readonly type = NotesActionTypes.StopEditingNote;
}
