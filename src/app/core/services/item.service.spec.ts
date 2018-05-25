import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { of } from 'rxjs';

import { TestUtil, name } from '../../../shared/test-util';
import * as fromCoreStore from '../store';

import {
  AddOrUpdateAction,
  RemoveEditedAction,
  StartEditingAction,
  StopEditingAction
} from '../store/item';

import { Item } from '../models/item';
import { ItemService } from './item.service';



describe(name(ItemService) + ' tests.', () => {
  // An attempt to create refactor-friendly test descriptions. Will see how it works in practice.
  const s: ItemService = TestUtil.nameAllProperties(new ItemService(null)); // Dummy service for use solely in test descriptions

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

  it(name(s.getEditedItem) + ' functions properly.', () => {
    const item = of({} as Item);
    spyOn(store, 'pipe').and.returnValue(item);

    let ret = service.getEditedItem();
    expect(ret).toEqual(item);

    ret = service.getEditedItem();
    expect(ret).toEqual(item);

    expect(store.pipe).toHaveBeenCalledTimes(1);
  });

  it(name(s.addOrUpdateItem) + ' dispatches ' + name(AddOrUpdateAction) + '.', () => {
    const text = 'test';
    const action = new AddOrUpdateAction(text);

    service.addOrUpdateItem(text);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(name(s.removeEditedItem) + ' dispatches ' + name(RemoveEditedAction) + '.', () => {
    const action = new RemoveEditedAction();

    service.removeEditedItem();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(name(s.startEditing) + ' dispatches ' + name(StartEditingAction) + '.', () => {
    const id = 1;
    const action = new StartEditingAction(id);

    service.startEditing(id);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(name(s.stopEditing) + ' dispatches ' + name(StopEditingAction) + '.', () => {
    const action = new StopEditingAction();

    service.stopEditing();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
