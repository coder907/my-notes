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
  defer,
} from 'rxjs';

import {
  map,
  mergeMap,
  switchMap,
  catchError,
  tap
} from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { AuthService } from '../../auth/services/auth-service';
import { FirestoreAction } from '../../core/models/firestore-action';

import { Tag } from '../models/tag';
import { TagActionTypes } from '../store/actions';
import { SyncTagsAddAction } from '../store/actions/sync-tags-add.action';
import { SyncTagsUpdateAction } from '../store/actions/sync-tags-update.action';
import { SyncTagsRemoveAction } from '../store/actions/sync-tags-remove.action';
import { RemoveTagRequestAction } from '../store/actions/remove-tag-request.action';
import { RemoveTagSuccessAction } from '../store/actions/remove-tag-success.action';
import { RemoveTagFailAction } from '../store/actions/remove-tag-fail.action';
import { AddTagRequestAction } from '../store/actions/add-tag-request.action';
import { AddTagSuccessAction } from '../store/actions/add-tag-success.action';
import { AddTagFailAction } from '../store/actions/add-tag-fail.action';
import { UpdateTagRequestAction } from '../store/actions/update-tag-request.action';
import { UpdateTagSuccessAction } from '../store/actions/update-tag-success.action';
import { UpdateTagFailAction } from '../store/actions/update-tag-fail.action';



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
  sync$: Observable<Action> = this.__actions.pipe(
    ofType(TagActionTypes.SyncTagsRequest),

    switchMap(a => this.__firestore.collection<Tag>(this.__tagsCollectionPath).stateChanges().pipe(

      mergeMap(actions => actions),

      map(action => {
        switch (action.type) {
          case FirestoreAction.Added:
            return new SyncTagsAddAction(
              {
                id: action.payload.doc.id,
                ...action.payload.doc.data()
              } as Tag);

          case FirestoreAction.Modified:
            return new SyncTagsUpdateAction(
              {
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
  remove$: Observable<Action> = this.__actions.pipe(
    ofType(TagActionTypes.RemoveTagRequest),

    map((action: RemoveTagRequestAction) => action.id),

    switchMap(id =>
      this.__firestore
        .collection<Tag>(this.__tagsCollectionPath)
        .doc(id)
        .delete()
      ),

    map(request => new RemoveTagSuccessAction()),

    catchError(error => of(new RemoveTagFailAction(error)))
  );

  @Effect()
  add$: Observable<Action> = this.__actions.pipe(
    ofType(TagActionTypes.AddTagRequest),

    switchMap((action: AddTagRequestAction) =>
      this.__firestore
        .collection<Tag>(this.__tagsCollectionPath)
        .add(
          {
            added: action.timestamp,
            updated: action.timestamp,
            text: action.text
          } as Tag)
        ),

    map(request => new AddTagSuccessAction()),

    catchError(error => of(new AddTagFailAction(error)))
  );

  @Effect()
  update$: Observable<Action> = this.__actions.pipe(
    ofType(TagActionTypes.UpdateTagRequest),

    mergeMap((action: UpdateTagRequestAction) =>
      this.__firestore
        .collection<Tag>(this.__tagsCollectionPath)
        .doc(action.id)
        .set(
          {
            updated: action.timestamp,
            text: action.text
          },
          {
            merge: true
          }
        )
      ),

    map(request => new UpdateTagSuccessAction()),

    catchError(error => of(new UpdateTagFailAction(error)))
  );

  @Effect({ dispatch: false })
  init$: Observable<any> = defer(() => of(null)).pipe(
    tap(() => console.log('TagEffects: init$'))
  );

  ngOnDestroy() {
    if (this.__userSubscription) {
      this.__userSubscription.unsubscribe();
    }
  }
}
