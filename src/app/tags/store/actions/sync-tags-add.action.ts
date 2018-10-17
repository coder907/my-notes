import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';
import { Tag } from '../../models/tag';



export class SyncTagsAddAction implements Action {
  readonly type = TagActionTypes.SyncTagsAdd;

  constructor(public tag: Tag) { }
}
