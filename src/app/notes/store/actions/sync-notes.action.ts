import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class SyncNotesAction implements Action {
  readonly type = NoteActionTypes.SyncNotes;
}
