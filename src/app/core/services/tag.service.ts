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
  StartEditingTagAction,
  StopEditingTagAction,
} from '../store/tag';

import * as fromCoreStore from '../store';



@Injectable({
  providedIn: 'root',
})
export class TagService {

  private __tags$: Observable<Tag[]>;
  private __editedTag$: Observable<Tag>;

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
    const subscription = this.editedTag$.subscribe(
      (editedTag) => {
        if (editedTag) {
          this.updateTag(editedTag.id, text);

        } else {
          this.addTag(text);
        }

        subscription.unsubscribe();
      },
      (error) => {
        console.error('Error adding or updating tag: ' + error);
        subscription.unsubscribe();
      }
    );
  }

  get editedTag$() {
    if (!this.__editedTag$) {
      this.__editedTag$ = this.__store.pipe(select(fromCoreStore.getEditedTag));
    }

    return this.__editedTag$;
  }

  startEditing(id: string) {
    this.__store.dispatch(new StartEditingTagAction(id));
  }

  stopEditing() {
    this.__store.dispatch(new StopEditingTagAction());
  }

  removeEditedTag() {
    const subscription = this.editedTag$.subscribe(
      (editedTag) => {
        if (editedTag) {
          this.removeTag(editedTag.id);
          subscription.unsubscribe();
        }
      },
      (error) => {
        console.error('Error removing edited tag: ' + error);
        subscription.unsubscribe();
      }
    );
  }
}
