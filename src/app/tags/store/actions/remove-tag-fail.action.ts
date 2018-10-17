import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class RemoveTagFailAction implements Action {
  readonly type = TagActionTypes.RemoveTagFail;

  constructor(public error: any) { }
}
