import {
  TagsState,
  initialState,
  adapter,
} from './state';

import {
  TagAction,
  TagActionTypes,
} from './actions';



export function reducer(state: TagsState = initialState, action: TagAction): TagsState {
  switch (action.type) {
    case TagActionTypes.SyncTagsAdd:
      return adapter.addOne(action.tag, state);

    case TagActionTypes.SyncTagsUpdate:
      return adapter.updateOne({
          id: action.tag.id,
          changes: {
            ...action.tag
          }
        },
        state
      );

    case TagActionTypes.SyncTagsRemove:
      return adapter.removeOne(action.id, state);

    case TagActionTypes.StartEditingTag:
      return {
        ...state,
        editedId: action.id,
      };

    case TagActionTypes.StopEditingTag:
      return {
        ...state,
        editedId: null,
      };

    default:
      return state;
  }
}
