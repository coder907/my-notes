import { Injectable } from '@angular/core';

import { NotesServiceBackendBase } from './notes-service-backend-base';
import { NotesDbService } from './notes-db.service';
import { Note } from '../../models/note';



@Injectable({
  providedIn: 'root',
})
export class NotesServiceBackend extends NotesServiceBackendBase {

  private readonly db = new NotesDbService();

  async loadNotes(): Promise<Note[]> {
    const notes = await this.db.notes.limit(20).toArray();
    return notes;
  }

  async addNote(text: string): Promise<Note> {
    const note: any = {
      createdTs: Date.now(),
      text,
    };

    const id = await this.db.notes.add(note as Note);
    note.id = id;

    return note as Note;
  }

  async updateNote(id: number, text: string): Promise<void> {
    const note: Partial<Note> = {
      text,
    };

    await this.db.notes.update(id, note);
  }

  async deleteNote(id: number): Promise<void> {
    await this.db.notes.delete(id);
  }
}
