import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { FirestoreAction } from './firestore-action';

import { Item } from '../models/item';

import {
  ItemActionTypes,
  // LoadRequestAction,
  AddRequestAction,
  AddSuccessAction,
  AddFailAction,
  UpdateRequestAction,
  UpdateSuccessAction,
  UpdateFailAction,
  RemoveRequestAction,
  RemoveSuccessAction,
  RemoveFailAction
} from '../store/item';



@Injectable()
export class ItemEffects {

  private actionTypeMap: { [key: string]: string; } = {};

  constructor(private actions: Actions, private firestore: AngularFirestore) {
    this.actionTypeMap[FirestoreAction.Added] = ItemActionTypes.SyncAdd;
    this.actionTypeMap[FirestoreAction.Modified] = ItemActionTypes.SyncUpdate;
    this.actionTypeMap[FirestoreAction.Removed] = ItemActionTypes.SyncRemove;
  }

  @Effect()
  items = this.firestore.collection<Item>('items').stateChanges().pipe(
    mergeMap(actions => actions),
    map(action => {
      switch (action.type) {
        case FirestoreAction.Added:
        case FirestoreAction.Modified:
          return {
            type: this.actionTypeMap[action.type],
            item: {
              id: action.payload.doc.id,
              ...action.payload.doc.data()
            }
          };
        case FirestoreAction.Removed:
          return {
            type: this.actionTypeMap[action.type],
            id: action.payload.doc.id
          };
      }
    }),
    // catchError(error => of(new SyncError(err)))
  );

  /*
  @Effect()
  loadItems: Observable<Action> = this.actions.ofType(ItemActionTypes.LoadRequest).pipe(
    switchMap(action => fromPromise(this.firestore.collection<Item>('items').ref.limit(20).get())),
    map(query => query.forEach(doc => doc.data())),
    catchError(error => of(new RemoveFailAction(error)))
  );
  */

  @Effect()
  removeItem: Observable<Action> = this.actions.ofType(ItemActionTypes.RemoveRequest).pipe(
    map((action: RemoveRequestAction) => action.id),
    mergeMap(id => of(this.firestore.collection<Item>('items').doc(id).delete())),
    map((request) => new RemoveSuccessAction()),
    catchError(error => of(new RemoveFailAction(error)))
  );

  @Effect()
  addItem: Observable<Action> = this.actions.ofType(ItemActionTypes.AddRequest).pipe(
    map((action: AddRequestAction) => action.text),
    mergeMap(text => of(this.firestore.collection<Item>('items').add({text} as Item))),
    map((request) => new AddSuccessAction()),
    catchError(error => of(new AddFailAction(error)))
  );

  @Effect()
  updateItem: Observable<Action> = this.actions.ofType(ItemActionTypes.UpdateRequest).pipe(
    map((action: UpdateRequestAction) => action),
    mergeMap(action => of(this.firestore.collection<Item>('items').doc(action.id).set({text: action.text}))),
    map((request) => new UpdateSuccessAction()),
    catchError(error => of(new UpdateFailAction(error)))
  );

}
