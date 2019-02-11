import Dexie from 'dexie';

import { Note } from 'src/app/notes/models/note';



export class Db extends Dexie {

  readonly notes: Dexie.Table<Note, number>;

  constructor() {
    super('MyNotesDatabase');

    this.version(1).stores({
      notes: '++id, createdTs, text'
    });
  }
}
