import { Action } from '@ngrx/store';

import { SettingsActionTypes } from '../actions';
import { Settings } from '../../models/settings';



export class LoadSettingsRequestAction implements Action {
  readonly type = SettingsActionTypes.LoadSettingsRequest;
}

export class LoadSettingsSuccessAction implements Action {
  readonly type = SettingsActionTypes.LoadSettingsSuccess;

  constructor(public settings: Settings) { }
}

export class LoadSettingsFailAction implements Action {
  readonly type = SettingsActionTypes.LoadSettingsFail;

  constructor(public error: any) { }
}
