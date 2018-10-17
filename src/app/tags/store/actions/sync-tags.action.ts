import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class SyncTagsAction implements Action {
  readonly type = TagActionTypes.SyncTags;
}
