import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class RemoveTagRequestAction implements Action {
  readonly type = TagActionTypes.RemoveTagRequest;

  constructor(public id: string) { }
}
