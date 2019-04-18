import { Settings } from '../../models/settings';



export abstract class SettingsServiceBackendBase {

  abstract async loadSettings(): Promise<Settings>;

  abstract async setLanguage(language: string): Promise<void>;

  abstract async setIsDayTheme(isDayTheme: boolean): Promise<void>;

  abstract async setRequiresPassword(requiresPassword: boolean): Promise<void>;
}
