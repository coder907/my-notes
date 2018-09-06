import {
  createEntityAdapter,
  EntityState
} from '@ngrx/entity';

import {
  Action,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import { Tag } from '../models/tag';



// #region Actions
export enum TagActionTypes {
  SyncTags            = '[Tag] SyncTags',
  SyncTagsAdd         = '[Tag] SyncTagsAdd',
  SyncTagsUpdate      = '[Tag] SyncTagsUpdate',
  SyncTagsRemove      = '[Tag] SyncTagsRemove',
  AddTagRequest       = '[Tag] AddTagRequest',
  AddTagSuccess       = '[Tag] AddTagSuccess',
  AddTagFail          = '[Tag] AddTagFail',
  UpdateTagRequest    = '[Tag] UpdateTagRequest',
  UpdateTagSuccess    = '[Tag] UpdateTagSuccess',
  UpdateTagFail       = '[Tag] UpdateTagFail',
  RemoveTagRequest    = '[Tag] RemoveTagRequest',
  RemoveTagSuccess    = '[Tag] RemoveTagSuccess',
  RemoveTagFail       = '[Tag] RemoveTagFail',
}

export class SyncTagsAction implements Action {
  readonly type = TagActionTypes.SyncTags;
}

export class SyncTagsAddAction implements Action {
  readonly type = TagActionTypes.SyncTagsAdd;

  constructor(public tag: Tag) { }
}

export class SyncTagsUpdateAction implements Action {
  readonly type = TagActionTypes.SyncTagsUpdate;

  constructor(public tag: Partial<Tag>) { }
}

export class SyncTagsRemoveAction implements Action {
  readonly type = TagActionTypes.SyncTagsRemove;

  constructor(public id: string) { }
}

export class AddTagRequestAction implements Action {
  readonly type = TagActionTypes.AddTagRequest;

  constructor(
    public timestamp: number,
    public text: string
  ) {}
}

export class AddTagSuccessAction implements Action {
  readonly type = TagActionTypes.AddTagSuccess;
}

export class AddTagFailAction implements Action {
  readonly type = TagActionTypes.AddTagFail;

  constructor(public error: any) { }
}

export class UpdateTagRequestAction implements Action {
  readonly type = TagActionTypes.UpdateTagRequest;

  constructor(
    public id: string,
    public timestamp: number,
    public text: string
  ) {}
}

export class UpdateTagSuccessAction implements Action {
  readonly type = TagActionTypes.UpdateTagSuccess;
}

export class UpdateTagFailAction implements Action {
  readonly type = TagActionTypes.UpdateTagFail;

  constructor(public error: any) { }
}

export class RemoveTagRequestAction implements Action {
  readonly type = TagActionTypes.RemoveTagRequest;

  constructor(public id: string) { }
}

export class RemoveTagSuccessAction implements Action {
  readonly type = TagActionTypes.RemoveTagSuccess;
}

export class RemoveTagFailAction implements Action {
  readonly type = TagActionTypes.RemoveTagFail;

  constructor(public error: any) { }
}

export type TagAction =
  SyncTagsAddAction |
  SyncTagsUpdateAction |
  SyncTagsRemoveAction |
  AddTagRequestAction |
  AddTagSuccessAction |
  AddTagFailAction |
  UpdateTagRequestAction |
  UpdateTagSuccessAction |
  UpdateTagFailAction |
  RemoveTagRequestAction |
  RemoveTagSuccessAction |
  RemoveTagFailAction
;
// #endregion Actions



// #region State
export interface State extends EntityState<Tag> {}

export const adapter = createEntityAdapter<Tag>();

const initialState: State = adapter.getInitialState({});
// #endregion State



// #region Reducer
export function reducer(state: State = initialState, action: TagAction): State {
  switch (action.type) {
  case TagActionTypes.SyncTagsAdd:
      return adapter.addOne(action.tag, state);

  case TagActionTypes.SyncTagsUpdate:
    return adapter.updateOne({
        id: action.tag.id,
        changes: {
          ...action.tag
        }
      },
      state
    );

  case TagActionTypes.SyncTagsRemove:
    return adapter.removeOne(action.id, state);

    default:
      return state;
  }
}
// #endregion Reducer



// #region Selectors
export const getTagState = createFeatureSelector<State>('tags');

export const {
  selectIds: getTagIds,
  selectEntities: getTagEntities,
  selectAll: getAllTags,
  selectTotal: getTotalTags,
} = adapter.getSelectors(getTagState);

export const getTag = (id: string) => createSelector(
  getTagEntities,
  (entities) => {
    return id && entities[id];
  }
);
// #endregion Selectors
