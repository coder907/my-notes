import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class StopEditingNoteAction implements Action {
  readonly type = NoteActionTypes.StopEditingNote;
}
