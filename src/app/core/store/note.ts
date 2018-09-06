import {
  createEntityAdapter,
  EntityState
} from '@ngrx/entity';

import {
  Action,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import { Note } from '../models/note';



// #region Actions
export enum NoteActionTypes {
  SyncNotes           = '[Note] SyncNotes',
  SyncNotesAdd        = '[Note] SyncNotesAdd',
  SyncNotesUpdate     = '[Note] SyncNotesUpdate',
  SyncNotesRemove     = '[Note] SyncNotesRemove',

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

export class SyncNotesAction implements Action {
  readonly type = NoteActionTypes.SyncNotes;
}

export class SyncNotesAddAction implements Action {
  readonly type = NoteActionTypes.SyncNotesAdd;

  constructor(public note: Note) { }
}

export class SyncNotesUpdateAction implements Action {
  readonly type = NoteActionTypes.SyncNotesUpdate;

  constructor(public note: Partial<Note>) { }
}

export class SyncNotesRemoveAction implements Action {
  readonly type = NoteActionTypes.SyncNotesRemove;

  constructor(public id: string) { }
}

export class AddNoteRequestAction implements Action {
  readonly type = NoteActionTypes.AddNoteRequest;

  constructor(
    public timestamp: number,
    public text: string
  ) {}
}

export class AddNoteSuccessAction implements Action {
  readonly type = NoteActionTypes.AddNoteSuccess;
}

export class AddNoteFailAction implements Action {
  readonly type = NoteActionTypes.AddNoteFail;

  constructor(public error: any) { }
}

export class UpdateNoteRequestAction implements Action {
  readonly type = NoteActionTypes.UpdateNoteRequest;

  constructor(
    public id: string,
    public timestamp: number,
    public text: string
  ) {}
}

export class UpdateNoteSuccessAction implements Action {
  readonly type = NoteActionTypes.UpdateNoteSuccess;
}

export class UpdateNoteFailAction implements Action {
  readonly type = NoteActionTypes.UpdateNoteFail;

  constructor(public error: any) { }
}

export class RemoveNoteRequestAction implements Action {
  readonly type = NoteActionTypes.RemoveNoteRequest;

  constructor(public id: string) { }
}

export class RemoveNoteSuccessAction implements Action {
  readonly type = NoteActionTypes.RemoveNoteSuccess;
}

export class RemoveNoteAction implements Action {
  readonly type = NoteActionTypes.RemoveNoteFail;

  constructor(public error: any) { }
}

export class StartEditingNoteAction implements Action {
  readonly type = NoteActionTypes.StartEditingNote;

  constructor(public id: string) { }
}

export class StopEditingNoteAction implements Action {
  readonly type = NoteActionTypes.StopEditingNote;
}

export type NoteAction =
  SyncNotesAddAction |
  SyncNotesUpdateAction |
  SyncNotesRemoveAction |
  AddNoteRequestAction |
  AddNoteSuccessAction |
  AddNoteFailAction |
  UpdateNoteRequestAction |
  UpdateNoteSuccessAction |
  UpdateNoteFailAction |
  RemoveNoteRequestAction |
  RemoveNoteSuccessAction |
  RemoveNoteAction |
  StartEditingNoteAction |
  StopEditingNoteAction
;
// #endregion Actions



// #region State
export interface State extends EntityState<Note> {
  editedId: string | null;
}

export const adapter = createEntityAdapter<Note>();

const initialState: State = adapter.getInitialState({
  editedId: null,
});
// #endregion State



// #region Reducer
export function reducer(state: State = initialState, action: NoteAction): State {
  switch (action.type) {
    case NoteActionTypes.SyncNotesAdd:
      return adapter.addOne(action.note, state);

    case NoteActionTypes.SyncNotesUpdate:
      return adapter.updateOne({
          id: action.note.id,
          changes: {
            ...action.note
          }
        },
        state
      );

    case NoteActionTypes.SyncNotesRemove:
      return adapter.removeOne(action.id, state);

    case NoteActionTypes.StartEditingNote:
      return {
        ...state,
        editedId: action.id,
      };

    case NoteActionTypes.StopEditingNote:
      return {
        ...state,
        editedId: null,
      };

    default:
      return state;
  }
}
// #endregion Reducer



// #region Selectors
export const getEditedId = (state: State) => state.editedId;

export const getNoteState = createFeatureSelector<State>('notes');

export const getEditedNoteId = createSelector(
  getNoteState,
  getEditedId
);

export const {
  selectIds: getNoteIds,
  selectEntities: getNoteEntities,
  selectAll: getAllNotes,
  selectTotal: getTotalNotes,
} = adapter.getSelectors(getNoteState);

export const getNote = (id: string) => createSelector(
  getNoteEntities,
  (entities) => {
    return entities[id];
  }
);

export const getEditedNote = createSelector(
  getNoteEntities,
  getEditedNoteId,
  (entities, editedId) => {
    return editedId && entities[editedId];
  }
);
// #endregion Selectors
