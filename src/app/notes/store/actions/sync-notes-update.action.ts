import { Action } from '@ngrx/store';

import { NoteActionTypes } from '.';
import { Note } from '../../models/note';



export class SyncNotesUpdateAction implements Action {
  readonly type = NoteActionTypes.SyncNotesUpdate;

  constructor(public note: Partial<Note>) { }
}
