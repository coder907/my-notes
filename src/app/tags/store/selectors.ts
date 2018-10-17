import {
  TagsState,
  adapter,
} from './state';

import {
  createSelector,
  createFeatureSelector
} from '@ngrx/store';



export const getEditedId = (state: TagsState) => state.editedId;

export const getTagState = createFeatureSelector<TagsState>('tags');

export const getEditedTagId = createSelector(
  getTagState,
  getEditedId
);

export const {
  selectIds: getTagIds,
  selectEntities: getTagEntities,
  selectAll: getAllTags,
  selectTotal: getTotalTags,
} = adapter.getSelectors(getTagState);

export const getTag = (id: string) => createSelector(
  getTagEntities,
  (entities) => {
    return entities[id];
  }
);

export const getEditedTag = createSelector(
  getTagEntities,
  getEditedTagId,
  (entities, editedId) => {
    return editedId && entities[editedId];
  }
);
