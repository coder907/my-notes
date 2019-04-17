import { Injectable } from '@angular/core';

import {
  Store,
  select,
} from '@ngrx/store';

import { Observable } from 'rxjs';

import { Settings } from '../models/settings';
import * as selectors from '../redux/selectors';
import { LoadSettingsRequestAction } from '../redux/actions/load-settings';
import { SetLanguageRequestAction } from '../redux/actions/set-language';
import { SetIsDayThemeRequestAction } from '../redux/actions/set-is-day-theme';
import { SetRequiresPasswordRequestAction } from '../redux/actions/set-requires-password';



@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  private languageValue$: Observable<string>;
  private isDayThemeValue$: Observable<boolean>;
  private requiresPasswordValue$: Observable<boolean>;

  constructor(
    private readonly store: Store<Settings>,
  ) { }

  get language$(): Observable<string> {
    if (!this.languageValue$) {
      this.languageValue$ = this.store.pipe(select(selectors.getLanguage));
    }

    return this.languageValue$;
  }

  get isDayTheme$(): Observable<boolean> {
    if (!this.isDayThemeValue$) {
      this.isDayThemeValue$ = this.store.pipe(select(selectors.isDayTheme));
    }

    return this.isDayThemeValue$;
  }

  get requiresPassword$(): Observable<boolean> {
    if (!this.requiresPasswordValue$) {
      this.requiresPasswordValue$ = this.store.pipe(select(selectors.requiresPassword));
    }

    return this.requiresPasswordValue$;
  }

  loadSettings() {
    this.store.dispatch(new LoadSettingsRequestAction());
  }

  setLanguage(language: string) {
    this.store.dispatch(new SetLanguageRequestAction(language));
  }

  setIsDayTheme(isDayTheme: boolean) {
    this.store.dispatch(new SetIsDayThemeRequestAction(isDayTheme));
  }

  setRequiresPassword(requiresPassword: boolean) {
    this.store.dispatch(new SetRequiresPasswordRequestAction(requiresPassword));
  }
}
