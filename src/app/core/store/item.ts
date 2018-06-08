import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createSelector, createFeatureSelector } from '@ngrx/store';

import { Item } from '../models/item';



// #region Actions
export enum ItemAction {
  Add = '[Item] Add',
  Update = '[Item] Update',
  Remove = '[Item] Remove',

  // AddOrUpdate = '[Item] AddOrUpdate',
  // StartEditing = '[Item] StartEditing',
  // StopEditing = '[Item] StopEditing',
  // RemoveEdited = '[Item] RemoveEdited',
}

export class AddAction implements Action {
  readonly type = ItemAction.Add;

  constructor(public item: Item) { }
}

export class UpdateAction implements Action {
  readonly type = ItemAction.Update;

  constructor(public item: Partial<Item>) { }
}

export class RemoveAction implements Action {
  readonly type = ItemAction.Remove;

  constructor(public id: number) { }
}

// export class AddOrUpdateAction implements Action {
//   readonly type = ItemAction.AddOrUpdate;

//   constructor(public text: string) { }
// }

// export class RemoveEditedAction implements Action {
//   readonly type = ItemAction.RemoveEdited;
// }

// export class StartEditingAction implements Action {
//   readonly type = ItemAction.StartEditing;

//   constructor(public id: number) { }
// }

// export class StopEditingAction implements Action {
//   readonly type = ItemAction.StopEditing;
// }

export type ItemActionAlias =
AddAction |
UpdateAction |
RemoveAction

// AddOrUpdateAction |
// StartEditingAction |
// StopEditingAction |
// RemoveEditedAction |
;
// #endregion Actions



// #region State
export interface State extends EntityState<Item> {
  // nextId: number;
  editedId: number | null;
}

export const adapter = createEntityAdapter<Item>();

const initialState: State = adapter.getInitialState({
  // nextId: 1, // Must start with 1, not 0
  editedId: null
});
// #endregion State



// #region Reducer
export function reducer(state: State = initialState, action: ItemActionAlias): State {
  switch (action.type) {
    case ItemAction.Add:
      return adapter.addOne(action.item, state);

    case ItemAction.Update:
      return adapter.updateOne({
          id: action.item.id,
          changes: {
            ...action.item
          }
        },
        state
      );

    case ItemAction.Remove:
      return adapter.removeOne(action.id, state);

    // case ItemAction.RemoveEdited:
    //   if (!state.editedId) {
    //     return state;
    //   }

    //   return adapter.removeOne(state.editedId, {
    //     ...state,
    //     editedId: null
    //   });

    // case ItemAction.AddOrUpdate:
    //   if (state.editedId) {
    //     return adapter.updateOne({
    //         id: state.editedId,
    //         changes: {
    //           text: action.text || ''
    //         }
    //       },
    //       state
    //     );
    //   } else {
    //     const item: Item = {
    //       id: state.nextId,
    //       text: action.text || '',
    //     };

    //     return adapter.addOne(item, {
    //       ...state,
    //       nextId: state.nextId + 1,
    //     });
    //   }

    // case ItemAction.StartEditing:
    //   return {
    //     ...state,
    //     editedId: action.id,
    //   };

    // case ItemAction.StopEditing:
    //   return {
    //     ...state,
    //     editedId: null,
    //   };

    // case ItemAction.RemoveEdited:
    //   if (!state.editedId) {
    //     return state;
    //   }

    //   return adapter.removeOne(state.editedId, {
    //     ...state,
    //     editedId: null
    //   });

    default:
      return state;
  }
}
// #endregion Reducer



// #region Selectors
export const getEditedId = (state: State) => state.editedId;

export const getItemState = createFeatureSelector<State>('items');

export const getEditedItemId = createSelector(
  getItemState,
  getEditedId
);

export const {
  selectIds: getItemIds,
  selectEntities: getItemEntities,
  selectAll: getAllItems,
  selectTotal: getTotalItems,
} = adapter.getSelectors(getItemState);

export const getEditedItem = createSelector(
  getItemEntities,
  getEditedItemId,
  (entities, editedId) => {
    return editedId && entities[editedId];
  }
);
// #endregion Selectors
