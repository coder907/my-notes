import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { TestUtil } from '../../../shared/test-util';
import * as fromCoreStore from '../store';

import {
  AddOrUpdateAction,
  RemoveEditedAction,
  StartEditingAction,
  StopEditingAction
} from '../store/item';

import { ItemService } from './item.service';

describe(`${ItemService.name}`, () => {
  // An attempt to create refactor-friendly test descriptions. Will see how it works in practice.
  const _service: ItemService = TestUtil.init(new ItemService(null)); // Dummy service for use solely in test descriptions
  const _ = TestUtil.getName; // Shorthand to minimize bloat in test descriptions

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

  it(_(ItemService) + ' is created', () => {
    expect(service).toBeTruthy();
  });

  it(_(_service.addOrUpdateItem) + ' dispatches ' + _(AddOrUpdateAction), () => {
    const text = 'test';
    const action = new AddOrUpdateAction(text);

    service.addOrUpdateItem(text);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(_(_service.removeEditedItem) + ' dispatches ' + _(RemoveEditedAction), () => {
    const action = new RemoveEditedAction();

    service.removeEditedItem();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(_(_service.startEditing) + ' dispatches ' + _(StartEditingAction), () => {
    const id = 1;
    const action = new StartEditingAction(id);

    service.startEditing(id);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it(_(_service.stopEditing) + ' dispatches ' + _(StopEditingAction), () => {
    const action = new StopEditingAction();

    service.stopEditing();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
