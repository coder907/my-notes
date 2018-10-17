import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class StopEditingTagAction implements Action {
  readonly type = TagActionTypes.StopEditingTag;
}
