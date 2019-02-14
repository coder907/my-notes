import {
  NotesState,
  adapter,
} from './state';

import {
  createSelector,
  createFeatureSelector
} from '@ngrx/store';



const getNotesState = createFeatureSelector<NotesState>('notes');

const getEditedIdFn = (state: NotesState) => state.editedId;

const getEditedId = createSelector(
  getNotesState,
  getEditedIdFn
);

export const {
  selectIds: getNoteIds,
  selectEntities: getNoteEntities,
  selectAll: getAllNotes,
  selectTotal: getTotalNotes,
} = adapter.getSelectors(getNotesState);

export const getNote = (id: string) => createSelector(
  getNoteEntities,
  (entities) => {
    return entities[id];
  }
);

export const getEditedNote = createSelector(
  getNoteEntities,
  getEditedId,
  (entities, editedId) => {
    return editedId && entities[editedId];
  }
);
