import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class StartEditingNoteAction implements Action {
  readonly type = NoteActionTypes.StartEditingNote;

  constructor(public id: string) { }
}
