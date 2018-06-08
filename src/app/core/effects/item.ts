import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

import { FirestoreAction } from './firestore-action';
import { Item } from '../models/item';

import {
  ItemAction,
  AddAction
} from '../store/item';



@Injectable()
export class ItemEffects {

  private actionTypeMap: { [key: string]: string; } = {};

  constructor(private firestore: AngularFirestore) {
    this.actionTypeMap[FirestoreAction.Added] = ItemAction.Add;
    this.actionTypeMap[FirestoreAction.Modified] = ItemAction.Update;
    this.actionTypeMap[FirestoreAction.Removed] = ItemAction.Remove;
  }

  @Effect()
  items$ = this.firestore.collection<Item>('items').stateChanges().pipe(
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
    })
  );
}

/*
@Injectable()
export class ItemEffects {

  constructor(private actions$: Actions, private db: Database) {}

  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('my_notes');
  });

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType(ItemAction.Load),
    switchMap(() =>
      this.db
        .query('items')
        .pipe(
          toArray(),
          map((items: Item[]) => new LoadSuccessAction(items)),
          catchError(error => of(new LoadFailAction(error)))
        )
    )
  );

  @Effect()
  addOrUpdate$: Observable<Action> = this.actions$.pipe(
    ofType(ItemAction.AddOrUpdate),
    map((action: AddOrUpdateAction) => action.text),
    mergeMap(text =>
      this.db
        .insert('items', [{text}], true)
        .pipe(
          map((item) => new AddOrUpdateSuccessAction(item)),
          catchError((error) => of(new AddOrUpdateFailAction(error)))
        )
    )
  );

  @Effect()
  remove$: Observable<Action> = this.actions$.pipe(
    ofType(ItemActionAlias.Remove),
    map((action: Remove) => action.payload),
    mergeMap(item =>
      this.db
        .executeWrite('items', 'delete', [item.id])
        .pipe(
          map(() => new RemoveSuccess(item)),
          catchError(() => of(new RemoveFail(item)))
        )
    )
  );
}
*/
