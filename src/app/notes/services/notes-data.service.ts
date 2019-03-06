import { Injectable } from '@angular/core';

import { IndexedDb } from '../../settings/services/indexed-db';

import { Note } from '../models/note';



@Injectable({
  providedIn: 'root',
})
export class NotesDataService {

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
}
