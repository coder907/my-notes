import { Action } from '@ngrx/store';

import { NotesActionTypes } from '../actions';



export class StartEditingNoteAction implements Action {
  readonly type = NotesActionTypes.StartEditingNote;

  constructor(public id: number) { }
}

export class StopEditingNoteAction implements Action {
  readonly type = NotesActionTypes.StopEditingNote;
}
