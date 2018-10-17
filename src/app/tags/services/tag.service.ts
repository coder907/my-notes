import { Injectable } from '@angular/core';

import {
  Store,
  select,
} from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Tag } from '../models/tag';
import { TagsState } from '../store/state';

import { SyncTagsAction } from '../store/actions/sync-tags.action';
import { AddTagRequestAction } from '../store/actions/add-tag-request.action';
import { UpdateTagRequestAction } from '../store/actions/update-tag-request.action';
import { RemoveTagRequestAction } from '../store/actions/remove-tag-request.action';
import { StartEditingTagAction } from '../store/actions/start-editing.action';
import { StopEditingTagAction } from '../store/actions/stop-editing.action';

import * as selectors from '../store/selectors';




@Injectable({
  providedIn: 'root',
})
export class TagService {

  private __tags$: Observable<Tag[]>;
  private __editedTag$: Observable<Tag>;

  constructor(
    private __store: Store<TagsState>
  ) {}

  startSync(): void {
    this.__store.dispatch(new SyncTagsAction());
  }

  get tags$(): Observable<Tag[]> {
    if (!this.__tags$) {
      this.__tags$ = this.__store.pipe(select(selectors.getAllTags));
    }
    return this.__tags$;
  }

  getTag(id: string): Observable<Tag> {
    return this.__store.pipe(select(selectors.getTag(id)));
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
    this.editedTag$.pipe(take(1)).subscribe(
      (editedTag) => {
        if (editedTag) {
          this.updateTag(editedTag.id, text);

        } else {
          this.addTag(text);
        }
      },
      (error) => {
        console.error('Error adding or updating tag: ' + error);
      }
    );
  }

  get editedTag$() {
    if (!this.__editedTag$) {
      this.__editedTag$ = this.__store.pipe(select(selectors.getEditedTag));
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
    this.editedTag$.pipe(take(1)).subscribe(
      (editedTag) => {
        if (editedTag) {
          this.removeTag(editedTag.id);
        }
      },
      (error) => {
        console.error('Error removing edited tag: ' + error);
      }
    );
  }
}
