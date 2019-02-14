import { Injectable } from '@angular/core';

import { IndexedDb } from './indexed-db';

import { DataServiceBase } from './data-service-base';
import { Note } from '../../../notes/models/note';
import { Settings } from 'src/app/settings/models/settings';



@Injectable({
  providedIn: 'root',
})
export class DataService extends DataServiceBase {

  private readonly languageKey = 'language';
  private readonly isDayThemeKey = 'isDayTheme';
  private readonly hasPasswordKey = 'hasPassword';

  private readonly db = new IndexedDb();

  public async loadNotes(): Promise<Note[]> {
    const notes = await this.db.notes.limit(20).toArray();
    return notes;
  }

  public async addNote(text: string): Promise<Note> {
    const note: any = {
      createdTs: Date.now(),
      text,
    };

    const id = await this.db.notes.add(note as Note);
    note.id = id;

    return note as Note;
  }

  public async updateNote(id: number, text: string): Promise<void> {
    const note: Partial<Note> = {
      text,
    };

    await this.db.notes.update(id, note);
  }

  public async deleteNote(id: number): Promise<void> {
    await this.db.notes.delete(id);
  }

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
