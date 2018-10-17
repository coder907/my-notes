import {
  NotesState,
  adapter,
} from './state';

import {
  createSelector,
  createFeatureSelector
} from '@ngrx/store';



export const getEditedId = (state: NotesState) => state.editedId;

export const getNoteState = createFeatureSelector<NotesState>('notes');

export const getEditedNoteId = createSelector(
  getNoteState,
  getEditedId
);

export const {
  selectIds: getNoteIds,
  selectEntities: getNoteEntities,
  selectAll: getAllNotes,
  selectTotal: getTotalNotes,
} = adapter.getSelectors(getNoteState);

export const getNote = (id: string) => createSelector(
  getNoteEntities,
  (entities) => {
    return entities[id];
  }
);

export const getEditedNote = createSelector(
  getNoteEntities,
  getEditedNoteId,
  (entities, editedId) => {
    return editedId && entities[editedId];
  }
);
