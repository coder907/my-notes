import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Item } from '../models/item';

import {
  AddRequestAction,
  UpdateRequestAction,
  RemoveRequestAction,
} from '../store/item';

import * as fromCoreStore from '../store';



@Injectable({
  providedIn: 'root',
})
export class ItemService {

  private items: Observable<Item[]>;

  constructor(private store: Store<fromCoreStore.State>) {}

  getItems(): Observable<Item[]> {
    if (!this.items) {
      this.items = this.store.pipe(select(fromCoreStore.getAllItems));
    }
    return this.items;
  }

  getItem(id: string): Observable<Item> {
    return this.store.pipe(select(fromCoreStore.getItem(id)));
  }

  addItem(text: string): void {
    this.store.dispatch(new AddRequestAction(new Date().getTime(), text));
  }

  updateItem(id: string, text: string): void {
    this.store.dispatch(new UpdateRequestAction(id, new Date().getTime(), text));
  }

  removeItem(id: string): void {
    this.store.dispatch(new RemoveRequestAction(id));
  }

}
