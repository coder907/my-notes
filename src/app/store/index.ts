import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';

import { environment } from 'src/environments/environment';

import { NotesState } from '../notes/store/state';
import { TagsState } from '../tags/store/state';

import { reducer as notesReducer } from '../notes/store/reducers';
import { reducer as tagsReducer } from '../tags/store/reducers';

import { AuthActionTypes } from '../auth/store/actions';



export interface AppState {
  notes: NotesState;
  tags: TagsState;
}

export const reducers: ActionReducerMap<AppState> = {
  notes: notesReducer,
  tags: tagsReducer,
};

export const metaReducers: MetaReducer<AppState>[] =
  !environment.production
    ? [logout]
    : [logout];

export function logout(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state: AppState, action: any) {
    return reducer(
      action.type === AuthActionTypes.SignOut ? undefined : state,
      action
    );
  };
}
