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
import { Note } from '../models/note';

import {
  NoteActionTypes,
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
} from '../store/note';



@Injectable()
export class NoteEffects implements OnDestroy {

  private __notesCollectionPath: string;
  private __userSubscription: Subscription;

  constructor(
    private __actions: Actions,
    private __firestore: AngularFirestore,
    private __authService: AuthService,
  ) {

    this.__userSubscription = this.__authService.user$.subscribe(
      (user) => {
        if (user) {
          this.__notesCollectionPath = `users/${user.uid}/notes`;
        }
      }
    );
  }

  // @Effect()
  // load$: Observable<Action> = this.__actions.ofType(NoteActionTypes.LoadRequest).pipe(
  //   switchMap(action => fromPromise(this.__firestore.collection<Note>('notes').ref.limit(20).get())),
  //   map(query => query.forEach(doc => doc.data())),
  //   catchError(error => of(new RemoveFailAction(error)))
  // );

  @Effect()
  sync$: Observable<Action> = this.__actions.ofType(NoteActionTypes.Sync).pipe(
    switchMap(a => this.__firestore.collection<Note>(this.__notesCollectionPath).stateChanges().pipe(
      mergeMap(actions => actions),
      map(action => {
        switch (action.type) {
          case FirestoreAction.Added:
            return new SyncAddAction({
              id: action.payload.doc.id,
              ...action.payload.doc.data()
            } as Note);

          case FirestoreAction.Modified:
            return new SyncUpdateAction({
              id: action.payload.doc.id,
              ...action.payload.doc.data()
            } as Partial<Note>);

          case FirestoreAction.Removed:
            return new SyncRemoveAction(action.payload.doc.id);
        }
      })
    )),
  );

  @Effect()
  remove$: Observable<Action> = this.__actions.ofType(NoteActionTypes.RemoveRequest).pipe(
    map((action: RemoveRequestAction) => action.id),
    switchMap(id => of(this.__firestore.collection<Note>(this.__notesCollectionPath).doc(id).delete())),
    map(request => new RemoveSuccessAction()),
    catchError(error => of(new RemoveFailAction(error)))
  );

  @Effect()
  add$: Observable<Action> = this.__actions.ofType(NoteActionTypes.AddRequest).pipe(
    // map((action: AddRequestAction) => action),
    switchMap((action: AddRequestAction) =>
      of(this.__firestore.collection<Note>(this.__notesCollectionPath).add({added: action.timestamp, updated: action.timestamp, text: action.text} as Note))),
    map(request => new AddSuccessAction()),
    catchError(error => of(new AddFailAction(error)))
  );

  @Effect()
  update$: Observable<Action> = this.__actions.ofType(NoteActionTypes.UpdateRequest).pipe(
    // map((action: UpdateRequestAction) => action),
    mergeMap((action: UpdateRequestAction) =>
      of(this.__firestore.collection<Note>(this.__notesCollectionPath).doc(action.id).set({updated: action.timestamp, text: action.text}, {merge: true}))),
    map(request => new UpdateSuccessAction()),
    catchError(error => of(new UpdateFailAction(error)))
  );

  ngOnDestroy() {
    if (this.__userSubscription) {
      this.__userSubscription.unsubscribe();
    }
  }
}
