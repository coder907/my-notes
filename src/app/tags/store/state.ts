import {
  createEntityAdapter,
  EntityState,
} from '@ngrx/entity';

import { Tag } from '../models/tag';



export interface TagsState extends EntityState<Tag> {
  editedId: string | null;
}

export const adapter = createEntityAdapter<Tag>();

export const initialState: TagsState = adapter.getInitialState({
  editedId: null,
});
