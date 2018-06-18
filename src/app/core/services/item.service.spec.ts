import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { of } from 'rxjs';

import { TestUtil, name } from '../../../shared/test-util';
import * as fromCoreStore from '../store';

import {
  AddRequestAction,
  UpdateRequestAction,
  RemoveRequestAction,
} from '../store/item';

import { Item } from '../models/item';
import { ItemService } from './item.service';



describe(name(ItemService) + ' tests.', () => {
  // An attempt to create refactor-friendly test descriptions. Will see how it works in practice.
  const s: ItemService = TestUtil.nameAllFunctions(new ItemService(null)); // Dummy service for use solely in test descriptions

  let service: ItemService;
  let store: Store<fromCoreStore.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromCoreStore.reducers),
      ],
      providers: [ItemService]
    });

    store = TestBed.get(Store);
    service = TestBed.get(ItemService);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it(name(ItemService) + ' is created.', () => {
    expect(service).toBeTruthy();
  });

  it(name(s.getItems) + ' functions properly.', () => {
    const items = of([] as Item[]);
    spyOn(store, 'pipe').and.returnValue(items);

    let ret = service.getItems();
    expect(ret).toEqual(items);

    ret = service.getItems();
    expect(ret).toEqual(items);

    expect(store.pipe).toHaveBeenCalledTimes(1);
  });

  it(name(s.getItem) + ' functions properly.', () => {
    const item = of({} as Item);
    const id = 'id';
    spyOn(store, 'pipe').and.returnValue(item);

    const ret = service.getItem(id);
    expect(ret).toEqual(item);
  });

  it(name(s.addItem) + ' dispatches ' + name(AddRequestAction) + '.', () => {
    const updatedDt = new Date().getTime();
    const text = 'add item';
    const action = new AddRequestAction(updatedDt, text);

    service.addItem(text);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(name(s.updateItem) + ' dispatches ' + name(UpdateRequestAction) + '.', () => {
    const id = 'id';
    const updatedDt = new Date().getTime();
    const text = 'update item';
    const action = new UpdateRequestAction(id, updatedDt, text);

    service.updateItem(id, text);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(name(s.removeItem) + ' dispatches ' + name(RemoveRequestAction) + '.', () => {
    const id = 'id';
    const action = new RemoveRequestAction(id);

    service.removeItem(id);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

});
