import { Note } from 'src/app/notes/models/note';
import { Settings } from 'src/app/settings/models/settings';



export abstract class DataServiceBase {

  public abstract loadNotes(): Promise<Note[]>;

  public abstract addNote(text: string): Promise<Note>;

  public abstract updateNote(id: number, text: string): Promise<void>;

  public abstract deleteNote(id: number): Promise<void>;

  public abstract loadSettings(): Promise<Settings>;

  public abstract setLanguage(language: string): Promise<void>;

  public abstract setIsDayTheme(isDayTheme: boolean): Promise<void>;

  public abstract setHasPassword(hasPassword: boolean): Promise<void>;

}
