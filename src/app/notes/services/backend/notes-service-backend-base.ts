import { Observable } from 'rxjs';

import { Note } from '../../models/note';



export abstract class NotesServiceBackendBase {

  abstract syncNotes(): Observable<Note[]>;

  abstract async addNote(text: string): Promise<Note>;

  abstract async updateNote(id: number, text: string): Promise<void>;

  abstract async deleteNote(id: number): Promise<void>;
}
