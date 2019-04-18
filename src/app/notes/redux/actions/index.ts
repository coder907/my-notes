import {
  SyncNotesRequestAction,
  SyncNotesSnapshotAction,
  SyncNotesFailAction
} from './sync-notes';

import {
  AddNoteRequestAction,
  AddNoteSuccessAction,
  AddNoteFailAction
} from './add-note';

import {
  UpdateNoteRequestAction,
  UpdateNoteSuccessAction,
  UpdateNoteFailAction
} from './update-note';

import {
  RemoveNoteRequestAction,
  RemoveNoteSuccessAction,
  RemoveNoteFailAction
} from './remove-note';

import {
  StartEditingNoteAction,
  StopEditingNoteAction
} from './editing';



export enum NotesActionTypes {
  SyncNotesRequest    = '[Note] SyncNotesRequest',
  SyncNotesSnapshot   = '[Note] SyncNotesSnapshot',
  SyncNotesFail       = '[Note] SyncNotesFail',
  AddNoteRequest      = '[Note] AddNoteRequest',
  AddNoteSuccess      = '[Note] AddNoteSuccess',
  AddNoteFail         = '[Note] AddNoteFail',
  UpdateNoteRequest   = '[Note] UpdateNoteRequest',
  UpdateNoteSuccess   = '[Note] UpdateNoteSuccess',
  UpdateNoteFail      = '[Note] UpdateNoteFail',
  RemoveNoteRequest   = '[Note] RemoveNoteRequest',
  RemoveNoteSuccess   = '[Note] RemoveNoteSuccess',
  RemoveNoteFail      = '[Note] RemoveNoteFail',
  StartEditingNote    = '[Note] StartEditingNote',
  StopEditingNote     = '[Note] StopEditingNote',
}

export type NotesAction =
  SyncNotesRequestAction |
  SyncNotesSnapshotAction |
  SyncNotesFailAction |
  AddNoteRequestAction |
  AddNoteSuccessAction |
  AddNoteFailAction |
  UpdateNoteRequestAction |
  UpdateNoteSuccessAction |
  UpdateNoteFailAction |
  RemoveNoteRequestAction |
  RemoveNoteSuccessAction |
  RemoveNoteFailAction |
  StartEditingNoteAction |
  StopEditingNoteAction
;
