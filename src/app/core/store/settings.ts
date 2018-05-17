import { Action } from '@ngrx/store';



// #region Actions
export enum SettingsAction {
  DayTheme = '[Settings] DayTheme',
  NightTheme = '[Settings] NightTheme',
  ToggleTheme = '[Settings] ToggleTheme',
}

export class DayThemeAction implements Action {
  readonly type = SettingsAction.DayTheme;
}

export class NightThemeAction implements Action {
  readonly type = SettingsAction.NightTheme;
}

export class ToggleThemeAction implements Action {
  readonly type = SettingsAction.ToggleTheme;
}

export type SettingsActionAlias =
  DayThemeAction |
  NightThemeAction |
  ToggleThemeAction
;
// #endregion Actions



// #region State
export interface State {
  isDayTheme: boolean;
}

const initialState: State = {
  isDayTheme: false,
};
// #endregion State



// #region Reducer
export function reducer(
  state: State = initialState,
  action: SettingsActionAlias
): State {
  switch (action.type) {
    case SettingsAction.DayTheme:
      return {
        isDayTheme: true,
      };

    case SettingsAction.NightTheme:
      return {
        isDayTheme: false,
      };

    case SettingsAction.ToggleTheme:
      return {
        isDayTheme: !state.isDayTheme,
      };

    default:
      return state;
  }
}
// #endregion Reducer



// // #region Selectors
// export const isDayTheme = (state: State) => state.isDayTheme;

// export const getSettingsState = createFeatureSelector<State>('settings');

// export const isDayTheme = createSelector(
//   getSettingsState,
//   fromSettings.isDayTheme
// );
// // #endregion Selectors
