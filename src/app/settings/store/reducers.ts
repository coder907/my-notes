import { initialState } from './state';

import {
  SettingsActionTypes,
  SettingsAction,
} from './actions';

import { Settings } from '../models/settings';



export function reducer(
  state: Settings = initialState,
  action: SettingsAction
): Settings {
  switch (action.type) {
    case SettingsActionTypes.LoadSettingsSuccess:
      return {
        ...action.settings
      };

    case SettingsActionTypes.SetLanguageSuccess:
      return {
        ...state,
        language: action.language,
      };

    case SettingsActionTypes.SetIsDayThemeSuccess:
      return {
        ...state,
        isDayTheme: action.isDayTheme,
      };

    case SettingsActionTypes.SetHasPasswordSuccess:
      return {
        ...state,
        hasPassword: action.hasPassword,
      };

    default:
      return state;
  }
}
