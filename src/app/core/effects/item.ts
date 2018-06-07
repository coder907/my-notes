/*
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import {
  ItemAction,
  LoadFailAction,
  LoadSuccessAction,
  AddOrUpdateAction,
  AddOrUpdateSuccessAction,
  AddOrUpdateFailAction,
  // RemoveSuccess
  // RemoveFail
} from '../store/item';

import { Item } from '../models/item';
import { switchMap, toArray, map, catchError, mergeMap } from 'rxjs/operators';



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
