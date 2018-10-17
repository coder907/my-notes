import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class UpdateTagRequestAction implements Action {
  readonly type = TagActionTypes.UpdateTagRequest;

  constructor(
    public id: string,
    public timestamp: number,
    public text: string
  ) {}
}
