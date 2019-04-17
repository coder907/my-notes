import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';

import { Settings } from '../models/settings';



const getSettings = createFeatureSelector<Settings>('settings');

const getLanguageFn = (state: Settings) => state.language;

export const getLanguage = createSelector(
  getSettings,
  getLanguageFn
);

const isDayThemeFn = (state: Settings) => state.isDayTheme;

export const isDayTheme = createSelector(
  getSettings,
  isDayThemeFn
);

const requiresPasswordFn = (state: Settings) => state.requiresPassword;

export const requiresPassword = createSelector(
  getSettings,
  requiresPasswordFn
);
