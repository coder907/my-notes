import { Injectable } from '@angular/core';

import { Note } from '../../models/note';



@Injectable({
  providedIn: 'root',
})
export abstract class NotesServiceBackendBase {

  abstract async loadNotes(): Promise<Note[]>;

  abstract async addNote(text: string): Promise<Note>;

  abstract async updateNote(id: number, text: string): Promise<void>;

  abstract async deleteNote(id: number): Promise<void>;
}
