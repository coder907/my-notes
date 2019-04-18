import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable
} from 'rxjs';

import {
  map,
  switchMap,
} from 'rxjs/operators';

import { NotesServiceBackendBase } from './notes-service-backend-base';
import { NotesDbService } from './notes-db.service';
import { Note } from '../../models/note';



@Injectable({
  providedIn: 'root',
})
export class NotesServiceBackend extends NotesServiceBackendBase {

  private readonly db = new NotesDbService();
  private readonly notes$ = new BehaviorSubject<Note[]>(null);
  private readonly pageSize = 20;

  syncNotes(): Observable<Note[]> {
    return this.notes$.pipe(
      switchMap(
        notes => this.db.notes.limit(this.pageSize).toArray()
      ),
      map(notes => notes
        .sort((note1, note2) => note1.createdTs - note2.createdTs)
        .reverse()
        .slice(0, this.pageSize)
      ),
    );
  }

  private refreshNotes() {
    // Just a trigger. Notes will be loaded later in the pipe.
    this.notes$.next(null);
  }

  async addNote(text: string): Promise<Note> {
    const note: any = {
      createdTs: Date.now(),
      text,
    };

    const id = await this.db.notes.add(note as Note);
    note.id = id;
    this.refreshNotes();
    return note as Note;
  }

  async updateNote(id: number, text: string): Promise<void> {
    const note: Partial<Note> = {
      text,
    };

    await this.db.notes.update(id, note);
    this.refreshNotes();
  }

  async deleteNote(id: number): Promise<void> {
    await this.db.notes.delete(id);
    this.refreshNotes();
  }
}
