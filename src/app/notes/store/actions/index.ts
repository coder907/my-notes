import { LoadNotesRequestAction } from './load-notes-request.action';
import { LoadNotesSuccessAction } from './load-notes-success.action';
import { LoadNotesFailAction } from './load-notes-fail.action';
import { AddNoteRequestAction } from './add-note-request.action';
import { AddNoteSuccessAction } from './add-note-success.action';
import { AddNoteFailAction } from './add-note-fail.action';
import { UpdateNoteRequestAction } from './update-note-request.action';
import { UpdateNoteSuccessAction } from './update-note-success.action';
import { UpdateNoteFailAction } from './update-note-fail.action';
import { RemoveNoteRequestAction } from './remove-note-request.action';
import { RemoveNoteSuccessAction } from './remove-note-success.action';
import { RemoveNoteFailAction } from './remove-note-fail.action';
import { StartEditingNoteAction } from './start-editing.action';
import { StopEditingNoteAction } from './stop-editing.action';



export enum NoteActionTypes {
  LoadNotesRequest    = '[Note] LoadNotesRequest',
  LoadNotesSuccess    = '[Note] LoadNotesSuccess',
  LoadNotesFail       = '[Note] LoadNotesFail',
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

export type NoteAction =
  LoadNotesRequestAction |
  LoadNotesSuccessAction |
  LoadNotesFailAction |
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
