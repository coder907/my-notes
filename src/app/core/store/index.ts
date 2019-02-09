import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { NotesState } from '../../notes/store/state';
import { reducer as notesReducer } from '../../notes/store/reducers';
import { AuthActionTypes } from '../../auth/store/actions';



export interface AppState {
  notes: NotesState;
}

export const reducers: ActionReducerMap<AppState> = {
  notes: notesReducer,
};

export const metaReducers: MetaReducer<AppState>[] =
  !environment.production
    ? [logout]
    : [logout];

export function logout(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: any) => {
    return reducer(
      action.type === AuthActionTypes.SignOut ? undefined : state,
      action
    );
  };
}
