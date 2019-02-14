import { Action } from '@ngrx/store';

import { SettingsActionTypes } from '.';



export class SetIsDayThemeRequestAction implements Action {
  readonly type = SettingsActionTypes.SetIsDayThemeRequest;

  constructor(public isDayTheme: boolean) { }
}

export class SetIsDayThemeSuccessAction implements Action {
  readonly type = SettingsActionTypes.SetIsDayThemeSuccess;

  constructor(public isDayTheme: boolean) { }
}

export class SetIsDayThemeFailAction implements Action {
  readonly type = SettingsActionTypes.SetIsDayThemeFail;

  constructor(public error: any) { }
}
