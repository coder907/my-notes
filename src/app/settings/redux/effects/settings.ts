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

import { SettingsActionTypes } from '../actions';

import {
  LoadSettingsRequestAction,
  LoadSettingsSuccessAction,
  LoadSettingsFailAction
} from '../actions/load-settings';

import {
  SetLanguageRequestAction,
  SetLanguageSuccessAction,
  SetLanguageFailAction
} from '../actions/set-language';

import {
  SetIsDayThemeRequestAction,
  SetIsDayThemeSuccessAction,
  SetIsDayThemeFailAction
} from '../actions/set-is-day-theme';

import {
  SetRequiresPasswordRequestAction,
  SetRequiresPasswordSuccessAction,
  SetRequiresPasswordFailAction
} from '../actions/set-requires-password';

import { GuiService } from 'src/app/core/services/gui.service';

import { SettingsServiceBackendBase } from '../../services/backend/settings-service-backend-base';
// import { SettingsServiceBackendMock } from '../../services/backend/settings-service-backend-mock';
import { SettingsServiceBackend } from '../../services/backend/settings-service-backend';



@Injectable()
export class SettingsEffects {

  private readonly settingsServiceBackend: SettingsServiceBackendBase;

  constructor(
    private readonly actions: Actions,
    private readonly guiService: GuiService,
    // settingsServiceBackend: SettingsServiceBackendMock,
    settingsServiceBackend: SettingsServiceBackend,
  ) {
    this.settingsServiceBackend = settingsServiceBackend;
  }

  @Effect()
  readonly loadSettings$: Observable<Action> = this.actions.pipe(
    ofType(SettingsActionTypes.LoadSettingsRequest),

    concatMap(async (action: LoadSettingsRequestAction) => {
      const settings = await this.settingsServiceBackend.loadSettings();
      return new LoadSettingsSuccessAction(settings);
    }),

    catchError(error => of(new LoadSettingsFailAction(error)))
  );

  @Effect()
  readonly setLanguage$: Observable<Action> = this.actions.pipe(
    ofType(SettingsActionTypes.SetLanguageRequest),

    concatMap(async (action: SetLanguageRequestAction) => {
      await this.settingsServiceBackend.setLanguage(action.language);
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
      await this.settingsServiceBackend.setIsDayTheme(isDayTheme);
      this.guiService.setIsDayTheme(isDayTheme);
      return new SetIsDayThemeSuccessAction(isDayTheme);
    }),

    catchError(error => of(new SetIsDayThemeFailAction(error)))
  );

  @Effect()
  readonly setRequiresPassword$: Observable<Action> = this.actions.pipe(
    ofType(SettingsActionTypes.SetRequiresPasswordRequest),

    concatMap(async (action: SetRequiresPasswordRequestAction) => {
      await this.settingsServiceBackend.setRequiresPassword(action.requiresPassword);
      this.guiService.showNotYetImplemented();
      return new SetRequiresPasswordSuccessAction(action.requiresPassword);
    }),

    catchError(error => of(new SetRequiresPasswordFailAction(error)))
  );
}
