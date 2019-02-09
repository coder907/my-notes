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
    case NoteActionTypes.LoadNotesSuccess:
      return adapter.addMany(action.notes, state);

    case NoteActionTypes.AddNoteSuccess:
      return adapter.addOne(action.note, state);

    case NoteActionTypes.UpdateNoteSuccess:
      return adapter.updateOne({
          id: action.id,
          changes: {
            text: action.text,
          }
        },
        state
      );

    case NoteActionTypes.RemoveNoteSuccess:
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
