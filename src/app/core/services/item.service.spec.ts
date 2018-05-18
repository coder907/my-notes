import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import * as fromCoreStore from '../store';

import {
  AddOrUpdateAction,
  RemoveEditedAction,
  StartEditingAction,
  StopEditingAction
} from '../store/item';

import { ItemService } from './item.service';



describe(`${ItemService.name}`, () => {
  const ItemServiceMethods = new ItemService(null); // Using this instance solely to access refactor friendly method names

  // TODO: ItemServiceMethods.addOrUpdateItem.name
  // 'name' returns empty string - find solution

  // const names = {};

  // for (const name in ItemServiceMethods) {
  //   if (ItemServiceMethods.hasOwnProperty(name)) {
  //     names[ItemServiceMethods[name]] = name;
  //   }
  // }

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

    spyOn(store, 'dispatch').and.callThrough();

    service = TestBed.get(ItemService);
  });

  it(`${ItemService.name} is created`, () => {
    expect(service).toBeTruthy();
  });

  it(`${ItemServiceMethods.addOrUpdateItem.name} dispatches ${AddOrUpdateAction.name}`, () => {
    const text = 'test';
    const action = new AddOrUpdateAction(text);

    service.addOrUpdateItem(text);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(`${ItemServiceMethods.removeEditedItem.name} dispatches ${RemoveEditedAction.name}`, () => {
    const action = new RemoveEditedAction();

    service.removeEditedItem();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(`${ItemServiceMethods.startEditing.name} dispatches ${StartEditingAction.name}`, () => {
    const id = 1;
    const action = new StartEditingAction(id);

    service.startEditing(id);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(`${ItemServiceMethods.stopEditing.name} dispatches ${StopEditingAction.name}`, () => {
    const action = new StopEditingAction();

    service.stopEditing();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
