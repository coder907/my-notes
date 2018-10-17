import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class UpdateTagFailAction implements Action {
  readonly type = TagActionTypes.UpdateTagFail;

  constructor(public error: any) { }
}
