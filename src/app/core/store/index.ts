// import {
//   ActionReducer,
//   ActionReducerMap,
//   MetaReducer,
// } from '@ngrx/store';

// import { storeFreeze } from 'ngrx-store-freeze';

// import { environment } from '../../../environments/environment';
// import * as fromAuth from './auth';
// import * as fromSettings from '../../settings/store/settings';
// import * as fromNote from '../../notes/store/note';
// import * as fromTag from '../../tags/store/tag';



// export interface State {
//   settings: fromSettings.State;
//   notes: fromNote.State;
//   tags: fromTag.State;
// }

// export const reducers: ActionReducerMap<State> = {
//   settings: fromSettings.reducer,
//   notes: fromNote.reducer,
//   tags: fromTag.reducer,
// };

// export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
//   return function(state: State, action: any): State {
//     console.log('state', state);
//     console.log('action', action);

//     return reducer(state, action);
//   };
// }

// export function logout(reducer: ActionReducer<State>): ActionReducer<State> {
//   return function (state: State, action: any) {
//     return reducer(action.type === fromAuth.AuthActionTypes.SignOut ? undefined : state, action);
//   };
// }

// export const metaReducers: MetaReducer<State>[] =
//   !environment.production
//     ? [logout, /*logger,*/ storeFreeze]
//     : [logout];

// export const getAllNotes = fromNote.getAllNotes;
// export const getNote = fromNote.getNote;
// export const getEditedNote = fromNote.getEditedNote;

// export const getAllTags = fromTag.getAllTags;
// export const getTag = fromTag.getTag;
// export const getEditedTag = fromTag.getEditedTag;
