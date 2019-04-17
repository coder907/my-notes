import { Action } from '@ngrx/store';

import { SettingsActionTypes } from '.';



export class SetRequiresPasswordRequestAction implements Action {
  readonly type = SettingsActionTypes.SetRequiresPasswordRequest;

  constructor(public requiresPassword: boolean) { }
}

export class SetRequiresPasswordSuccessAction implements Action {
  readonly type = SettingsActionTypes.SetRequiresPasswordSuccess;

  constructor(public requiresPassword: boolean) { }
}

export class SetRequiresPasswordFailAction implements Action {
  readonly type = SettingsActionTypes.SetRequiresPasswordFail;

  constructor(public error: any) { }
}
