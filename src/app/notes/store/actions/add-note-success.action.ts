import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';
import { Note } from '../../models/note';



export class AddNoteSuccessAction implements Action {
  readonly type = NoteActionTypes.AddNoteSuccess;

  constructor(public note: Note) { }
}
