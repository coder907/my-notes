import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';

import {
  Effect,
  Actions,
  ofType
} from '@ngrx/effects';

import {
  Observable,
  of,
} from 'rxjs';

import {
  concatMap,
  catchError,
} from 'rxjs/operators';

import { SettingsActionTypes } from '../redux/actions';

import {
  LoadSettingsRequestAction,
  LoadSettingsSuccessAction,
  LoadSettingsFailAction
} from '../redux/actions/load-settings';

import {
  SetLanguageRequestAction,
  SetLanguageSuccessAction,
  SetLanguageFailAction
} from '../redux/actions/set-language';

import {
  SetIsDayThemeRequestAction,
  SetIsDayThemeSuccessAction,
  SetIsDayThemeFailAction
} from '../redux/actions/set-is-day-theme';

import {
  SetRequiresPasswordRequestAction,
  SetRequiresPasswordSuccessAction,
  SetRequiresPasswordFailAction
} from '../redux/actions/set-requires-password';

import { SettingsDataService } from 'src/app/settings/services/data/settings-data.service';
import { GuiService } from 'src/app/core/services/gui.service';



@Injectable()
export class SettingsEffects {

  constructor(
    private readonly actions: Actions,
    private readonly settingsDataService: SettingsDataService,
    private readonly guiService: GuiService,
  ) { }

  @Effect()
  readonly loadSettings$: Observable<Action> = this.actions.pipe(
    ofType(SettingsActionTypes.LoadSettingsRequest),

    concatMap(async (action: LoadSettingsRequestAction) => {
      const settings = await this.settingsDataService.loadSettings();
      return new LoadSettingsSuccessAction(settings);
    }),

    catchError(error => of(new LoadSettingsFailAction(error)))
  );

  @Effect()
  readonly setLanguage$: Observable<Action> = this.actions.pipe(
    ofType(SettingsActionTypes.SetLanguageRequest),

    concatMap(async (action: SetLanguageRequestAction) => {
      await this.settingsDataService.setLanguage(action.language);
      this.guiService.showNotYetImplemented();
      return new SetLanguageSuccessAction(action.language);
    }),

    catchError(error => of(new SetLanguageFailAction(error)))
  );

  @Effect()
  readonly setIsDayTheme$: Observable<Action> = this.actions.pipe(
    ofType(SettingsActionTypes.SetIsDayThemeRequest),

    concatMap(async (action: SetIsDayThemeRequestAction) => {
      const isDayTheme = action.isDayTheme;
      await this.settingsDataService.setIsDayTheme(isDayTheme);
      this.guiService.setIsDayTheme(isDayTheme);
      return new SetIsDayThemeSuccessAction(isDayTheme);
    }),

    catchError(error => of(new SetIsDayThemeFailAction(error)))
  );

  @Effect()
  readonly setRequiresPassword$: Observable<Action> = this.actions.pipe(
    ofType(SettingsActionTypes.SetRequiresPasswordRequest),

    concatMap(async (action: SetRequiresPasswordRequestAction) => {
      await this.settingsDataService.setRequiresPassword(action.requiresPassword);
      this.guiService.showNotYetImplemented();
      return new SetRequiresPasswordSuccessAction(action.requiresPassword);
    }),

    catchError(error => of(new SetRequiresPasswordFailAction(error)))
  );
}
