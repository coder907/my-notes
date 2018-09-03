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
  RemoveFailAction,
  SyncAddAction,
  SyncUpdateAction,
  SyncRemoveAction,
} from '../store/item';



@Injectable()
export class ItemEffects {

  constructor(
    private __actions: Actions,
    private __firestore: AngularFirestore
  ) {}

  @Effect()
  items = this.__firestore.collection<Item>('items').stateChanges().pipe(
    mergeMap(actions => actions),
    map(action => {
      switch (action.type) {
        case FirestoreAction.Added:
          return new SyncAddAction({
            id: action.payload.doc.id,
            ...action.payload.doc.data()
          } as Item);

        case FirestoreAction.Modified:
          return new SyncUpdateAction({
            id: action.payload.doc.id,
            ...action.payload.doc.data()
          } as Partial<Item>);

        case FirestoreAction.Removed:
          return new SyncRemoveAction(action.payload.doc.id);
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
  removeItem: Observable<Action> = this.__actions.ofType(ItemActionTypes.RemoveRequest).pipe(
    map((action: RemoveRequestAction) => action.id),
    switchMap(id => of(this.__firestore.collection<Item>('items').doc(id).delete())),
    map(request => new RemoveSuccessAction()),
    catchError(error => of(new RemoveFailAction(error)))
  );

  @Effect()
  addItem: Observable<Action> = this.__actions.ofType(ItemActionTypes.AddRequest).pipe(
    // map((action: AddRequestAction) => action),
    switchMap((action: AddRequestAction) =>
      of(this.__firestore.collection<Item>('items').add({added: action.timestamp, updated: action.timestamp, text: action.text} as Item))),
    map(request => new AddSuccessAction()),
    catchError(error => of(new AddFailAction(error)))
  );

  @Effect()
  updateItem: Observable<Action> = this.__actions.ofType(ItemActionTypes.UpdateRequest).pipe(
    // map((action: UpdateRequestAction) => action),
    mergeMap((action: UpdateRequestAction) =>
      of(this.__firestore.collection<Item>('items').doc(action.id).set({updated: action.timestamp, text: action.text}, {merge: true}))),
    map(request => new UpdateSuccessAction()),
    catchError(error => of(new UpdateFailAction(error)))
  );
}
