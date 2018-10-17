import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';
import { Tag } from '../../models/tag';



export class SyncTagsUpdateAction implements Action {
  readonly type = TagActionTypes.SyncTagsUpdate;

  constructor(public tag: Partial<Tag>) { }
}
