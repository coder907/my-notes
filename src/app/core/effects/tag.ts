import {
  Injectable,
  OnDestroy
} from '@angular/core';

import { Action } from '@ngrx/store';

import {
  Effect,
  Actions,
  ofType
} from '@ngrx/effects';

import {
  Observable,
  Subscription,
  of,
} from 'rxjs';

import {
  map,
  mergeMap,
  switchMap,
  catchError
} from 'rxjs/operators';

import {
  AngularFirestore,
  DocumentChangeAction
} from 'angularfire2/firestore';

import { AuthService } from '../../auth/services/auth-service';
import { FirestoreAction } from './firestore-action';
import { Tag } from '../models/tag';

import {
  TagActionTypes,
  AddTagRequestAction,
  AddTagSuccessAction,
  AddTagFailAction,
  UpdateTagRequestAction,
  UpdateTagSuccessAction,
  UpdateTagFailAction,
  RemoveTagRequestAction,
  RemoveTagSuccessAction,
  RemoveTagFailAction,
  SyncTagsAddAction,
  SyncTagsUpdateAction,
  SyncTagsRemoveAction,
} from '../store/tag';



@Injectable()
export class TagEffects implements OnDestroy {

  private __tagsCollectionPath: string;
  private __userSubscription: Subscription;

  constructor(
    private __actions: Actions,
    private __firestore: AngularFirestore,
    private __authService: AuthService,
  ) {

    this.__userSubscription = this.__authService.user$.subscribe(
      (user) => {
        if (user) {
          this.__tagsCollectionPath = `users/${user.uid}/tags`;
        }
      }
    );
  }

  @Effect()
  sync$: Observable<Action> = this.__actions.ofType(TagActionTypes.SyncTags).pipe(
    switchMap(a => this.__firestore.collection<Tag>(this.__tagsCollectionPath).stateChanges().pipe(
      mergeMap(actions => actions),
      map(action => {
        switch (action.type) {
          case FirestoreAction.Added:
            return new SyncTagsAddAction({
              id: action.payload.doc.id,
              ...action.payload.doc.data()
            } as Tag);

          case FirestoreAction.Modified:
            return new SyncTagsUpdateAction({
              id: action.payload.doc.id,
              ...action.payload.doc.data()
            } as Partial<Tag>);

          case FirestoreAction.Removed:
            return new SyncTagsRemoveAction(action.payload.doc.id);
        }
      })
    )),
  );

  @Effect()
  remove$: Observable<Action> = this.__actions.ofType(TagActionTypes.RemoveTagRequest).pipe(
    map((action: RemoveTagRequestAction) => action.id),
    switchMap(id => of(this.__firestore.collection<Tag>(this.__tagsCollectionPath).doc(id).delete())),
    map(request => new RemoveTagSuccessAction()),
    catchError(error => of(new RemoveTagFailAction(error)))
  );

  @Effect()
  add$: Observable<Action> = this.__actions.ofType(TagActionTypes.AddTagRequest).pipe(
    // map((action: AddRequestAction) => action),
    switchMap((action: AddTagRequestAction) =>
      of(this.__firestore.collection<Tag>(this.__tagsCollectionPath).add({added: action.timestamp, updated: action.timestamp, text: action.text} as Tag))),
    map(request => new AddTagSuccessAction()),
    catchError(error => of(new AddTagFailAction(error)))
  );

  @Effect()
  update$: Observable<Action> = this.__actions.ofType(TagActionTypes.UpdateTagRequest).pipe(
    // map((action: UpdateRequestAction) => action),
    mergeMap((action: UpdateTagRequestAction) =>
      of(this.__firestore.collection<Tag>(this.__tagsCollectionPath).doc(action.id).set({updated: action.timestamp, text: action.text}, {merge: true}))),
    map(request => new UpdateTagSuccessAction()),
    catchError(error => of(new UpdateTagFailAction(error)))
  );

  ngOnDestroy() {
    if (this.__userSubscription) {
      this.__userSubscription.unsubscribe();
    }
  }
}
