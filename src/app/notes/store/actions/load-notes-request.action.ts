import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class LoadNotesRequestAction implements Action {
  readonly type = NoteActionTypes.LoadNotesRequest;
}
