import {
  LoadSettingsRequestAction,
  LoadSettingsSuccessAction,
  LoadSettingsFailAction
} from './load-settings';

import {
  SetLanguageRequestAction,
  SetLanguageSuccessAction,
  SetLanguageFailAction
} from './set-language';

import {
  SetIsDayThemeRequestAction,
  SetIsDayThemeSuccessAction,
  SetIsDayThemeFailAction
} from './set-is-day-theme';

import {
  SetHasPasswordRequestAction,
  SetHasPasswordSuccessAction,
  SetHasPasswordFailAction
} from './set-has-password';



export enum SettingsActionTypes {
  LoadSettingsRequest   = '[Settings] LoadSettingsRequest',
  LoadSettingsSuccess   = '[Settings] LoadSettingsSuccess',
  LoadSettingsFail      = '[Settings] LoadSettingsFail',
  SetLanguageRequest    = '[Settings] SetLanguageRequest',
  SetLanguageSuccess    = '[Settings] SetLanguageSuccess',
  SetLanguageFail       = '[Settings] SetLanguageFail',
  SetIsDayThemeRequest  = '[Settings] SetIsDayThemeRequest',
  SetIsDayThemeSuccess  = '[Settings] SetIsDayThemeSuccess',
  SetIsDayThemeFail     = '[Settings] SetIsDayThemeFail',
  SetHasPasswordRequest = '[Settings] SetHasPasswordRequest',
  SetHasPasswordSuccess = '[Settings] SetHasPasswordSuccess',
  SetHasPasswordFail    = '[Settings] SetHasPasswordFail',
}

export type SettingsAction =
  LoadSettingsRequestAction |
  LoadSettingsSuccessAction |
  LoadSettingsFailAction |
  SetLanguageRequestAction |
  SetLanguageSuccessAction |
  SetLanguageFailAction |
  SetIsDayThemeRequestAction |
  SetIsDayThemeSuccessAction |
  SetIsDayThemeFailAction |
  SetHasPasswordRequestAction |
  SetHasPasswordSuccessAction |
  SetHasPasswordFailAction
;
