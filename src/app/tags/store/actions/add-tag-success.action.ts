import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class AddTagSuccessAction implements Action {
  readonly type = TagActionTypes.AddTagSuccess;
}
