import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createSelector, createFeatureSelector } from '@ngrx/store';

import { Item } from '../models/item';



// #region Actions
export enum ItemActionTypes {
  SyncAdd         = '[Item] Add',
  SyncUpdate      = '[Item] Update',
  SyncRemove      = '[Item] Remove',
  // LoadRequest     = '[Item] LoadRequest',
  AddRequest      = '[Item] AddRequest',
  AddSuccess      = '[Item] AddSuccess',
  AddFail         = '[Item] AddFail',
  UpdateRequest   = '[Item] UpdateRequest',
  UpdateSuccess   = '[Item] UpdateSuccess',
  UpdateFail      = '[Item] UpdateFail',
  RemoveRequest   = '[Item] RemoveRequest',
  RemoveSuccess   = '[Item] RemoveSuccess',
  RemoveFail      = '[Item] RemoveFail',
}

export class SyncAddAction implements Action {
  readonly type = ItemActionTypes.SyncAdd;

  constructor(public item: Item) { }
}

export class SyncUpdateAction implements Action {
  readonly type = ItemActionTypes.SyncUpdate;

  constructor(public item: Partial<Item>) { }
}

export class SyncRemoveAction implements Action {
  readonly type = ItemActionTypes.SyncRemove;

  constructor(public id: string) { }
}

// export class LoadRequestAction implements Action {
//   readonly type = ItemActionTypes.LoadRequest;
// }

export class AddRequestAction implements Action {
  readonly type = ItemActionTypes.AddRequest;

  constructor(public text: string) { }
}

export class AddSuccessAction implements Action {
  readonly type = ItemActionTypes.AddSuccess;
}

export class AddFailAction implements Action {
  readonly type = ItemActionTypes.AddFail;

  constructor(public error: any) { }
}

export class UpdateRequestAction implements Action {
  readonly type = ItemActionTypes.UpdateRequest;

  constructor(public id: string, public text: string) { }
}

export class UpdateSuccessAction implements Action {
  readonly type = ItemActionTypes.UpdateSuccess;
}

export class UpdateFailAction implements Action {
  readonly type = ItemActionTypes.UpdateFail;

  constructor(public error: any) { }
}

export class RemoveRequestAction implements Action {
  readonly type = ItemActionTypes.RemoveRequest;

  constructor(public id: string) { }
}

export class RemoveSuccessAction implements Action {
  readonly type = ItemActionTypes.RemoveSuccess;
}

export class RemoveFailAction implements Action {
  readonly type = ItemActionTypes.RemoveFail;

  constructor(public error: any) { }
}

export type ItemAction =
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
export interface State extends EntityState<Item> {}

export const adapter = createEntityAdapter<Item>();

const initialState: State = adapter.getInitialState({});
// #endregion State



// #region Reducer
export function reducer(state: State = initialState, action: ItemAction): State {
  switch (action.type) {
  case ItemActionTypes.SyncAdd:
      return adapter.addOne(action.item, state);

  case ItemActionTypes.SyncUpdate:
    return adapter.updateOne({
        id: action.item.id,
        changes: {
          ...action.item
        }
      },
      state
    );

  case ItemActionTypes.SyncRemove:
    return adapter.removeOne(action.id, state);

    default:
      return state;
  }
}
// #endregion Reducer



// #region Selectors
export const getItemState = createFeatureSelector<State>('items');

export const {
  selectIds: getItemIds,
  selectEntities: getItemEntities,
  selectAll: getAllItems,
  selectTotal: getTotalItems,
} = adapter.getSelectors(getItemState);

export const getItem = (id: string) => createSelector(
  getItemEntities,
  (entities) => {
    return id && entities[id];
  }
);
// #endregion Selectors
