import { Injectable } from '@angular/core';

import {
  Observable,
  BehaviorSubject
} from 'rxjs';

import { map } from 'rxjs/operators';

import * as timeoutUtil from 'src/app/shared/utils/timeout-util';
import { deepCopy } from 'src/app/shared/utils/test-util';
import { NotesServiceBackendBase } from './notes-service-backend-base';
import { Note } from '../../models/note';



@Injectable({
  providedIn: 'root',
})
export class NotesServiceBackendMock extends NotesServiceBackendBase {

  private readonly notes: Note[] = [];
  private readonly notes$ = new BehaviorSubject<Note[]>(this.notes);
  private readonly shortDelayMs = 500;
  private readonly pageSize = 20;
  private nextId = 1;

  syncNotes(): Observable<Note[]> {
    return this.notes$.pipe(
      map(notes => notes
        .sort((note1, note2) => note1.createdTs - note2.createdTs)
        .reverse()
        .slice(0, this.pageSize)
      ),
    );
  }

  private refreshNotes() {
    this.notes$.next(deepCopy(this.notes));
  }

  async addNote(text: string): Promise<Note> {
    await timeoutUtil.sleep(this.shortDelayMs);

    const note: Note = {
      id: this.nextId++,
      createdTs: Date.now(),
      text
    };

    this.notes.push(note);
    this.refreshNotes();
    return note;
  }

  async updateNote(id: number, text: string): Promise<void> {
    await timeoutUtil.sleep(this.shortDelayMs);

    const note = this.notes.find(
      n => n.id === id
    );

    note.text = text;
    this.refreshNotes();
  }

  async deleteNote(id: number): Promise<void> {
    await timeoutUtil.sleep(this.shortDelayMs);

    const index = this.notes.findIndex(
      n => n.id === id
    );

    this.notes.splice(index, 1);
    this.refreshNotes();
  }
}
