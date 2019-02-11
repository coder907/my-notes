import { Injectable } from '@angular/core';

import { Db } from './db';

import { DataServiceBase } from './data-service-base';
import { Note } from '../../../notes/models/note';



@Injectable({
  providedIn: 'root',
})
export class DataService extends DataServiceBase {

  private readonly dbService = new Db();

  public async loadNotes(): Promise<Note[]> {
    const notes = await this.dbService.notes.limit(20).toArray();
    return notes;
  }

  public async addNote(text: string): Promise<Note> {
    const note: any = {
      createdTs: Date.now(),
      text,
    };

    const id = await this.dbService.notes.add(note as Note);
    note.id = id;

    return note as Note;
  }

  public async updateNote(id: number, text: string): Promise<void> {
    const note: Partial<Note> = {
      text,
    };

    await this.dbService.notes.update(id, note);
  }

  public async deleteNote(id: number): Promise<void> {
    await this.dbService.notes.delete(id);
  }
}
