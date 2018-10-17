import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class SyncNotesRemoveAction implements Action {
  readonly type = NoteActionTypes.SyncNotesRemove;

  constructor(public id: string) { }
}
