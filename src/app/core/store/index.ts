import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../environments/environment';
import * as fromAuth from './auth';
import * as fromSettings from './settings';
import * as fromNote from './note';
import * as fromTag from './tag';



export interface State {
  settings: fromSettings.State;
  notes: fromNote.State;
  tags: fromTag.State;
}

export const reducers: ActionReducerMap<State> = {
  settings: fromSettings.reducer,
  notes: fromNote.reducer,
  tags: fromTag.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export function logout(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any) {
    return reducer(action.type === fromAuth.AuthActionTypes.SignOut ? undefined : state, action);
  };
}

export const metaReducers: MetaReducer<State>[] =
  !environment.production
    ? [logout, /*logger,*/ storeFreeze]
    : [logout];

export const getAllNotes = fromNote.getAllNotes;
export const getNote = fromNote.getNote;

export const getAllTags = fromTag.getAllTags;
export const getTag = fromTag.getTag;
