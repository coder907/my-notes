import { Injectable } from '@angular/core';

import { Settings } from 'src/app/settings/models/settings';



@Injectable({
  providedIn: 'root',
})
export class SettingsDataService {

  private readonly languageKey = 'language';
  private readonly isDayThemeKey = 'isDayTheme';
  private readonly hasPasswordKey = 'hasPassword';

  public async loadSettings(): Promise<Settings> {
    const language = localStorage.getItem(this.languageKey);
    const isDayTheme = localStorage.getItem(this.isDayThemeKey);
    const hasPassword = localStorage.getItem(this.hasPasswordKey);

    const settings: Settings = {
      language: language || 'en',
      isDayTheme: isDayTheme != null ? JSON.parse(isDayTheme) : true,
      hasPassword: hasPassword != null ? JSON.parse(hasPassword) : false,
    };

    return settings;
  }

  public async setLanguage(language: string): Promise<void> {
    localStorage.setItem(this.languageKey, language);
  }

  public async setIsDayTheme(isDayTheme: boolean): Promise<void> {
    localStorage.setItem(this.isDayThemeKey, isDayTheme.toString());
  }

  public async setHasPassword(hasPassword: boolean): Promise<void> {
    localStorage.setItem(this.hasPasswordKey, hasPassword.toString());
  }
}
