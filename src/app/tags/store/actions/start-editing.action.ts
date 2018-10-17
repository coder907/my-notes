import { Action } from '@ngrx/store';

import { TagActionTypes } from '.';



export class StartEditingTagAction implements Action {
  readonly type = TagActionTypes.StartEditingTag;

  constructor(public id: string) { }
}
