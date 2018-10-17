import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class SyncTagsRemoveAction implements Action {
  readonly type = TagActionTypes.SyncTagsRemove;

  constructor(public id: string) { }
}
