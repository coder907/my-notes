import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';



export class LoadNotesFailAction implements Action {
  readonly type = NoteActionTypes.LoadNotesFail;

  constructor(public error: any) { }
}
