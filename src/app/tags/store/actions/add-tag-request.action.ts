import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class AddTagRequestAction implements Action {
  readonly type = TagActionTypes.AddTagRequest;

  constructor(
    public timestamp: number,
    public text: string
  ) {}
}
