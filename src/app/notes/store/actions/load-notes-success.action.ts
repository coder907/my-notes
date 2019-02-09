import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';
import { Note } from '../../models/note';



export class LoadNotesSuccessAction implements Action {
  readonly type = NoteActionTypes.LoadNotesSuccess;

  constructor(public notes: Note[]) { }
}
