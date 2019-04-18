import {
  NotesState,
  initialState,
  adapter,
} from './state';

import {
  NotesAction,
  NotesActionTypes,
} from './actions';



export function reducer(
  state: NotesState = initialState,
  action: NotesAction
): NotesState {
  switch (action.type) {
    case NotesActionTypes.SyncNotesSnapshot:
      // return adapter.addMany(action.notes, state);
      state = adapter.removeAll(state);
      return adapter.addMany(action.notes, state);

    case NotesActionTypes.AddNoteSuccess:
      return adapter.addOne(action.note, state);

    case NotesActionTypes.UpdateNoteSuccess:
      return adapter.updateOne({
        id: action.id,
        changes: {
          text: action.text,
        }
      },
        state
      );

    case NotesActionTypes.RemoveNoteSuccess:
      return adapter.removeOne(action.id, state);

    case NotesActionTypes.StartEditingNote:
      return {
        ...state,
        editedId: action.id,
      };

    case NotesActionTypes.StopEditingNote:
      return {
        ...state,
        editedId: null,
      };

    default:
      return state;
  }
}
