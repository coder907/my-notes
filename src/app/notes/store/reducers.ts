import {
  NotesState,
  initialState,
  adapter,
} from './state';

import {
  NoteAction,
  NoteActionTypes,
} from './actions';



export function reducer(state: NotesState = initialState, action: NoteAction): NotesState {
  switch (action.type) {
    case NoteActionTypes.SyncNotesAdd:
      return adapter.addOne(action.note, state);

    case NoteActionTypes.SyncNotesUpdate:
      return adapter.updateOne({
          id: action.note.id,
          changes: {
            ...action.note
          }
        },
        state
      );

    case NoteActionTypes.SyncNotesRemove:
      return adapter.removeOne(action.id, state);

    case NoteActionTypes.StartEditingNote:
      return {
        ...state,
        editedId: action.id,
      };

    case NoteActionTypes.StopEditingNote:
      return {
        ...state,
        editedId: null,
      };

    default:
      return state;
  }
}
