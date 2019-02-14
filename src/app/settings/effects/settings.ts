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
  map,
  concatMap,
  catchError,
} from 'rxjs/operators';

import { SettingsDataService } from 'src/app/core/services/data/settings-data.service';
import { SettingsActionTypes } from '../store/actions';

import {
  LoadSettingsRequestAction,
  LoadSettingsSuccessAction,
  LoadSettingsFailAction
} from '../store/actions/load-settings';

import {
  SetLanguageRequestAction,
  SetLanguageSuccessAction,
  SetLanguageFailAction
} from '../store/actions/set-language';

import {
  SetIsDayThemeRequestAction,
  SetIsDayThemeSuccessAction,
  SetIsDayThemeFailAction
} from '../store/actions/set-is-day-theme';

import {
  SetHasPasswordRequestAction,
  SetHasPasswordSuccessAction,
  SetHasPasswordFailAction
} from '../store/actions/set-has-password';



@Injectable()
export class SettingsEffects {

  constructor(
    private readonly actions: Actions,
    private readonly settingsDataService: SettingsDataService,
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
      return new SetLanguageSuccessAction(action.language);
    }),

    catchError(error => of(new SetLanguageFailAction(error)))
  );

  @Effect()
  readonly setIsDayTheme$: Observable<Action> = this.actions.pipe(
    ofType(SettingsActionTypes.SetIsDayThemeRequest),

    concatMap(async (action: SetIsDayThemeRequestAction) => {
      await this.settingsDataService.setIsDayTheme(action.isDayTheme);
      return new SetIsDayThemeSuccessAction(action.isDayTheme);
    }),

    catchError(error => of(new SetIsDayThemeFailAction(error)))
  );

  @Effect()
  readonly setHasPassword$: Observable<Action> = this.actions.pipe(
    ofType(SettingsActionTypes.SetHasPasswordRequest),

    concatMap(async (action: SetHasPasswordRequestAction) => {
      await this.settingsDataService.setHasPassword(action.hasPassword);
      return new SetHasPasswordSuccessAction(action.hasPassword);
    }),

    catchError(error => of(new SetHasPasswordFailAction(error)))
  );
}
