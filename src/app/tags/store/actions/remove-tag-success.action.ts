import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class RemoveTagSuccessAction implements Action {
  readonly type = TagActionTypes.RemoveTagSuccess;
}
