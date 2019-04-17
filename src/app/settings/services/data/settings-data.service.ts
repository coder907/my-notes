import { Injectable } from '@angular/core';

import { Settings } from 'src/app/settings/models/settings';



@Injectable({
  providedIn: 'root',
})
export class SettingsDataService {

  private readonly languageKey = 'language';
  private readonly isDayThemeKey = 'isDayTheme';
  private readonly requiresPasswordKey = 'requiresPassword';

  public async loadSettings(): Promise<Settings> {
    const language = localStorage.getItem(this.languageKey);
    const isDayTheme = localStorage.getItem(this.isDayThemeKey);
    const requiresPassword = localStorage.getItem(this.requiresPasswordKey);

    const settings: Settings = {
      language: language || 'en',
      isDayTheme: isDayTheme != null ? JSON.parse(isDayTheme) : true,
      requiresPassword: requiresPassword != null ? JSON.parse(requiresPassword) : true,
    };

    return settings;
  }

  public async setLanguage(language: string): Promise<void> {
    localStorage.setItem(this.languageKey, language);
  }

  public async setIsDayTheme(isDayTheme: boolean): Promise<void> {
    localStorage.setItem(this.isDayThemeKey, isDayTheme.toString());
  }

  public async setRequiresPassword(requiresPassword: boolean): Promise<void> {
    localStorage.setItem(this.requiresPasswordKey, requiresPassword.toString());
  }
}
