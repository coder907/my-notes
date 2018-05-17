import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../environments/environment';
import * as fromSettings from './settings';
import * as fromItem from './item';



export interface State {
  settings: fromSettings.State;
  items: fromItem.State;
}

export const reducers: ActionReducerMap<State> = {
  settings: fromSettings.reducer,
  items: fromItem.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] =
  !environment.production
    ? [logger, storeFreeze]
    : [];

export const getAllItems = fromItem.getAllItems;
export const getEditedItem = fromItem.getEditedItem;
