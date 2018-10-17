import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';
import { Note } from '../../models/note';



export class SyncNotesAddAction implements Action {
  readonly type = NoteActionTypes.SyncNotesAdd;

  constructor(public note: Note) { }
}
