import { Action } from '@ngrx/store';

import { AuthActionTypes } from '.';



export class SignOutAction implements Action {
  readonly type = AuthActionTypes.SignOut;
}
