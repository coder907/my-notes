import { Action } from '@ngrx/store';

import { NotesActionTypes } from '.';
import { Note } from '../../models/note';



export class SyncNotesRequestAction implements Action {
  readonly type = NotesActionTypes.SyncNotesRequest;
}

export class SyncNotesSnapshotAction implements Action {
  readonly type = NotesActionTypes.SyncNotesSnapshot;

  constructor(public notes: Note[]) { }
}

export class SyncNotesFailAction implements Action {
  readonly type = NotesActionTypes.SyncNotesFail;

  constructor(public error: any) { }
}
