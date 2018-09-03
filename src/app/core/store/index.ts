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
import * as fromNote from './note';



export interface State {
  settings: fromSettings.State;
  notes: fromNote.State;
}

export const reducers: ActionReducerMap<State> = {
  settings: fromSettings.reducer,
  notes: fromNote.reducer,
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

export const getAllNotes = fromNote.getAllNotes;
export const getNote = fromNote.getNote;
