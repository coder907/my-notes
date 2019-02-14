import { Action } from '@ngrx/store';

import { SettingsActionTypes } from '.';



export class SetLanguageRequestAction implements Action {
  readonly type = SettingsActionTypes.SetLanguageRequest;

  constructor(public language: string) { }
}

export class SetLanguageSuccessAction implements Action {
  readonly type = SettingsActionTypes.SetLanguageSuccess;

  constructor(public language: string) { }
}

export class SetLanguageFailAction implements Action {
  readonly type = SettingsActionTypes.SetLanguageFail;

  constructor(public error: any) { }
}
