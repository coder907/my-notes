import { ActionReducerMap } from '@ngrx/store';

import { NotesState } from '../notes/store/state';
import { TagsState } from '../tags/store/state';

import { reducer as notesReducer } from '../notes/store/reducers';
import { reducer as tagsReducer } from '../tags/store/reducers';



export interface AppState {
  notes: NotesState;
  tags: TagsState;
}

export const reducers: ActionReducerMap<AppState> = {
  notes: notesReducer,
  tags: tagsReducer,
};
