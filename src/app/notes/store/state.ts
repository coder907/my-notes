import {
  createEntityAdapter,
  EntityState,
} from '@ngrx/entity';

import { Note } from '../models/note';



export interface NotesState extends EntityState<Note> {
  editedId: string | null;
}

export const adapter = createEntityAdapter<Note>();

export const initialState: NotesState = adapter.getInitialState({
  editedId: null,
});
