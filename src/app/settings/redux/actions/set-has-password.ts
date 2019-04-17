import { Action } from '@ngrx/store';

import { SettingsActionTypes } from '../actions';



export class SetHasPasswordRequestAction implements Action {
  readonly type = SettingsActionTypes.SetHasPasswordRequest;

  constructor(public hasPassword: boolean) { }
}

export class SetHasPasswordSuccessAction implements Action {
  readonly type = SettingsActionTypes.SetHasPasswordSuccess;

  constructor(public hasPassword: boolean) { }
}

export class SetHasPasswordFailAction implements Action {
  readonly type = SettingsActionTypes.SetHasPasswordFail;

  constructor(public error: any) { }
}
