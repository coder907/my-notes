import {
  TestBed,
  inject
} from '@angular/core/testing';

import {
  StoreModule,
  Store
} from '@ngrx/store';

import { of } from 'rxjs';

import {
  TestUtil,
  name
} from '../../../shared/test-util';

import * as fromCoreStore from '../store';

import {
  AddRequestAction,
  UpdateRequestAction,
  RemoveRequestAction,
} from '../store/note';

import { Note } from '../models/note';
import { NoteService } from './note.service';



describe(name(NoteService) + ' tests.', () => {
  // An attempt to create refactor-friendly test descriptions. Will see how it works in practice.
  const s: NoteService = TestUtil.nameAllFunctions(new NoteService(null)); // Dummy service for use solely in test descriptions

  let service: NoteService;
  let store: Store<fromCoreStore.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromCoreStore.reducers),
      ],
      providers: [NoteService]
    });

    store = TestBed.get(Store);
    service = TestBed.get(NoteService);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it(name(NoteService) + ' is created.', () => {
    expect(service).toBeTruthy();
  });

  it(name(s.getNotes) + ' functions properly.', () => {
    const notes$ = of([] as Note[]);
    spyOn(store, 'pipe').and.returnValue(notes$);

    let ret = service.getNotes();
    expect(ret).toEqual(notes$);

    ret = service.getNotes();
    expect(ret).toEqual(notes$);

    expect(store.pipe).toHaveBeenCalledTimes(1);
  });

  it(name(s.getNote) + ' functions properly.', () => {
    const note$ = of({} as Note);
    const id = 'id';
    spyOn(store, 'pipe').and.returnValue(note$);

    const ret = service.getNote(id);
    expect(ret).toEqual(note$);
  });

  it(name(s.addNote) + ' dispatches ' + name(AddRequestAction) + '.', () => {
    const updatedDt = new Date().getTime();
    const text = 'add note';
    const action = new AddRequestAction(updatedDt, text);

    service.addNote(text);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(name(s.updateNote) + ' dispatches ' + name(UpdateRequestAction) + '.', () => {
    const id = 'id';
    const updatedDt = new Date().getTime();
    const text = 'update note';
    const action = new UpdateRequestAction(id, updatedDt, text);

    service.updateNote(id, text);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(name(s.removeNote) + ' dispatches ' + name(RemoveRequestAction) + '.', () => {
    const id = 'id';
    const action = new RemoveRequestAction(id);

    service.removeNote(id);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

});
