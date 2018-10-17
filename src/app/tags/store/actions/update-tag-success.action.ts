import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class UpdateTagSuccessAction implements Action {
  readonly type = TagActionTypes.UpdateTagSuccess;
}
