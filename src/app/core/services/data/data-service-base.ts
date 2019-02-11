import { Note } from 'src/app/notes/models/note';



export abstract class DataServiceBase {

  public abstract loadNotes(): Promise<Note[]>;

  public abstract addNote(text: string): Promise<Note>;

  public abstract updateNote(id: number, text: string): Promise<void>;

  public abstract deleteNote(id: number): Promise<void>;
}
