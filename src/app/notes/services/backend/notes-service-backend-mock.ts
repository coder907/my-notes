import { Injectable } from '@angular/core';

import { NotesServiceBackendBase } from './notes-service-backend-base';
import { Note } from '../../models/note';



@Injectable({
  providedIn: 'root',
})
export class NotesServiceBackendMock extends NotesServiceBackendBase {

  private readonly notes: Note[] = [];

  private nextId = 1;

  async loadNotes(): Promise<Note[]> {
    return this.notes;
  }

  async addNote(text: string): Promise<Note> {
    const note: Note = {
      id: this.nextId++,
      createdTs: Date.now(),
      text
    };

    this.notes.push(note);

    return note;
  }

  async updateNote(id: number, text: string): Promise<void> {
    const note = this.notes.find(
      n => n.id === id
    );

    note.text = text;
  }

  async deleteNote(id: number): Promise<void> {
    const index = this.notes.findIndex(
      n => n.id === id
    );

    this.notes.splice(index, 1);
  }
}
