import { Injectable } from '@angular/core';

import Dexie from 'dexie';

import { Note } from '../../notes/models/note';



@Injectable({
  providedIn: 'root',
})
export class DataService extends Dexie {

  notes: Dexie.Table<Note, number>;

  constructor() {
    super('MyNotesDatabase');

    this.version(1).stores({
      notes: '++id, createdTs, text'
    });
  }
}
