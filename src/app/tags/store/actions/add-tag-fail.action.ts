import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class AddTagFailAction implements Action {
  readonly type = TagActionTypes.AddTagFail;

  constructor(public error: any) { }
}
