import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Item } from '../models/item';

// import {
//   AddOrUpdateAction,
//   StartEditingAction,
//   StopEditingAction,
//   RemoveEditedAction
// } from '../store/item';

import * as fromCoreStore from '../store';



@Injectable({
  providedIn: 'root',
})
export class ItemService {

  private items: Observable<Item[]>;
  private editedItem: Observable<Item>;

  constructor(
    private store: Store<fromCoreStore.State>
  ) {}

  getItems(): Observable<Item[]> {
    if (!this.items) {
      this.items = this.store.pipe(select(fromCoreStore.getAllItems));
    }
    return this.items;
  }

  getEditedItem(): Observable<Item> {
    if (!this.editedItem) {
      this.editedItem = this.store.pipe(select(fromCoreStore.getEditedItem));
    }

    return this.editedItem;
  }

  addOrUpdateItem(text: string): void {
    // this.store.dispatch(new AddOrUpdateAction(text));
  }

  removeEditedItem(): void {
    // this.store.dispatch(new RemoveEditedAction());
  }

  startEditing(id: number) {
    // this.store.dispatch(new StartEditingAction(id));
  }

  stopEditing(): void {
    // this.store.dispatch(new StopEditingAction());
  }
}
