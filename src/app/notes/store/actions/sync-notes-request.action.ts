import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class SyncNotesRequestAction implements Action {
  readonly type = NoteActionTypes.SyncNotesRequest;
}
