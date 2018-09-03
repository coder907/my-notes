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
  SyncAdd         = '[Note] Add',
  SyncUpdate      = '[Note] Update',
  SyncRemove      = '[Note] Remove',
  // LoadRequest     = '[Note] LoadRequest',
  AddRequest      = '[Note] AddRequest',
  AddSuccess      = '[Note] AddSuccess',
  AddFail         = '[Note] AddFail',
  UpdateRequest   = '[Note] UpdateRequest',
  UpdateSuccess   = '[Note] UpdateSuccess',
  UpdateFail      = '[Note] UpdateFail',
  RemoveRequest   = '[Note] RemoveRequest',
  RemoveSuccess   = '[Note] RemoveSuccess',
  RemoveFail      = '[Note] RemoveFail',
}

export class SyncAddAction implements Action {
  readonly type = NoteActionTypes.SyncAdd;

  constructor(public note: Note) { }
}

export class SyncUpdateAction implements Action {
  readonly type = NoteActionTypes.SyncUpdate;

  constructor(public note: Partial<Note>) { }
}

export class SyncRemoveAction implements Action {
  readonly type = NoteActionTypes.SyncRemove;

  constructor(public id: string) { }
}

// export class LoadRequestAction implements Action {
//   readonly type = NoteActionTypes.LoadRequest;
// }

export class AddRequestAction implements Action {
  readonly type = NoteActionTypes.AddRequest;

  constructor(
    public timestamp: number,
    public text: string
  ) {}
}

export class AddSuccessAction implements Action {
  readonly type = NoteActionTypes.AddSuccess;
}

export class AddFailAction implements Action {
  readonly type = NoteActionTypes.AddFail;

  constructor(public error: any) { }
}

export class UpdateRequestAction implements Action {
  readonly type = NoteActionTypes.UpdateRequest;

  constructor(
    public id: string,
    public timestamp: number,
    public text: string
  ) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = NoteActionTypes.UpdateSuccess;
}

export class UpdateFailAction implements Action {
  readonly type = NoteActionTypes.UpdateFail;

  constructor(public error: any) { }
}

export class RemoveRequestAction implements Action {
  readonly type = NoteActionTypes.RemoveRequest;

  constructor(public id: string) { }
}

export class RemoveSuccessAction implements Action {
  readonly type = NoteActionTypes.RemoveSuccess;
}

export class RemoveFailAction implements Action {
  readonly type = NoteActionTypes.RemoveFail;

  constructor(public error: any) { }
}

export type NoteAction =
  SyncAddAction |
  SyncUpdateAction |
  SyncRemoveAction |
// LoadRequestAction |
  AddRequestAction |
  AddSuccessAction |
  AddFailAction |
  UpdateRequestAction |
  UpdateSuccessAction |
  UpdateFailAction |
  RemoveRequestAction |
  RemoveSuccessAction |
  RemoveFailAction
;
// #endregion Actions



// #region State
export interface State extends EntityState<Note> {}

export const adapter = createEntityAdapter<Note>();

const initialState: State = adapter.getInitialState({});
// #endregion State



// #region Reducer
export function reducer(state: State = initialState, action: NoteAction): State {
  switch (action.type) {
  case NoteActionTypes.SyncAdd:
      return adapter.addOne(action.note, state);

  case NoteActionTypes.SyncUpdate:
    return adapter.updateOne({
        id: action.note.id,
        changes: {
          ...action.note
        }
      },
      state
    );

  case NoteActionTypes.SyncRemove:
    return adapter.removeOne(action.id, state);

    default:
      return state;
  }
}
// #endregion Reducer



// #region Selectors
export const getNoteState = createFeatureSelector<State>('notes');

export const {
  selectIds: getNoteIds,
  selectEntities: getNoteEntities,
  selectAll: getAllNotes,
  selectTotal: getTotalNotes,
} = adapter.getSelectors(getNoteState);

export const getNote = (id: string) => createSelector(
  getNoteEntities,
  (entities) => {
    return id && entities[id];
  }
);
// #endregion Selectors
