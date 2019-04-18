import { Injectable } from '@angular/core';

import { SettingsServiceBackendBase } from './settings-service-backend-base';
import { Settings } from 'src/app/settings/models/settings';



@Injectable({
  providedIn: 'root',
})
export class SettingsServiceBackendMock extends SettingsServiceBackendBase {

  private language = 'en';
  private isDayTheme = true;
  private requiresPassword = true;

  async loadSettings(): Promise<Settings> {
    const settings: Settings = {
      language: this.language,
      isDayTheme: this.isDayTheme,
      requiresPassword: this.requiresPassword
    };

    return settings;
  }

  async setLanguage(language: string): Promise<void> {
    this.language = language;
  }

  async setIsDayTheme(isDayTheme: boolean): Promise<void> {
    this.isDayTheme = isDayTheme;
  }

  async setRequiresPassword(requiresPassword: boolean): Promise<void> {
    this.requiresPassword = requiresPassword;
  }
}
