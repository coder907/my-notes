import { Injectable } from '@angular/core';

import {
  Store,
  select,
} from '@ngrx/store';

import { Observable } from 'rxjs';

import { Tag } from '../models/tag';

import {
  SyncTagsAction,
  AddTagRequestAction,
  UpdateTagRequestAction,
  RemoveTagRequestAction,
} from '../store/tag';

import * as fromCoreStore from '../store';



@Injectable({
  providedIn: 'root',
})
export class TagService {

  private __tags$: Observable<Tag[]>;

  private __editedTagId: string = null;

  constructor(
    private __store: Store<fromCoreStore.State>
  ) {}

  startSync(): void {
    this.__store.dispatch(new SyncTagsAction());
  }

  get tags$(): Observable<Tag[]> {
    if (!this.__tags$) {
      this.__tags$ = this.__store.pipe(select(fromCoreStore.getAllTags));
    }
    return this.__tags$;
  }

  getTag(id: string): Observable<Tag> {
    return this.__store.pipe(select(fromCoreStore.getTag(id)));
  }

  addTag(text: string): void {
    this.__store.dispatch(new AddTagRequestAction(new Date().getTime(), text));
  }

  updateTag(id: string, text: string): void {
    this.__store.dispatch(new UpdateTagRequestAction(id, new Date().getTime(), text));
  }

  removeTag(id: string): void {
    this.__store.dispatch(new RemoveTagRequestAction(id));
  }

  addOrUpdateTag(text: string) {
    if (this.__editedTagId) {
      this.updateTag(this.__editedTagId, text);

    } else {
      this.addTag(text);
    }
  }

  get editedTag$() {
    if (this.__editedTagId) {
      return this.getTag(this.__editedTagId);

    } else {
      return null;
    }
  }

  startEditing(id: string) {
    this.__editedTagId = id;
  }

  stopEditing() {
    this.__editedTagId = null;
  }

  removeEditedTag() {
    if (this.__editedTagId) {
      this.removeTag(this.__editedTagId);
      this.stopEditing();
    }
  }
}
