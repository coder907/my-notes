import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class SyncTagsRequestAction implements Action {
  readonly type = TagActionTypes.SyncTagsRequest;
}
