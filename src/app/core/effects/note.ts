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
  AddNoteRequestAction,
  AddNoteSuccessAction,
  AddNoteFailAction,
  UpdateNoteRequestAction,
  UpdateNoteSuccessAction,
  UpdateNoteFailAction,
  RemoveNoteRequestAction,
  RemoveNoteSuccessAction,
  RemoveNoteAction,
  SyncNotesAddAction,
  SyncNotesUpdateAction,
  SyncNotesRemoveAction,
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

  @Effect()
  sync$: Observable<Action> = this.__actions.ofType(NoteActionTypes.SyncNotes).pipe(
    switchMap(a => this.__firestore.collection<Note>(this.__notesCollectionPath).stateChanges().pipe(
      mergeMap(actions => actions),
      map(action => {
        switch (action.type) {
          case FirestoreAction.Added:
            return new SyncNotesAddAction({
              id: action.payload.doc.id,
              ...action.payload.doc.data()
            } as Note);

          case FirestoreAction.Modified:
            return new SyncNotesUpdateAction({
              id: action.payload.doc.id,
              ...action.payload.doc.data()
            } as Partial<Note>);

          case FirestoreAction.Removed:
            return new SyncNotesRemoveAction(action.payload.doc.id);
        }
      })
    )),
  );

  @Effect()
  remove$: Observable<Action> = this.__actions.ofType(NoteActionTypes.RemoveNoteRequest).pipe(
    map((action: RemoveNoteRequestAction) => action.id),
    switchMap(id => of(this.__firestore.collection<Note>(this.__notesCollectionPath).doc(id).delete())),
    map(request => new RemoveNoteSuccessAction()),
    catchError(error => of(new RemoveNoteAction(error)))
  );

  @Effect()
  add$: Observable<Action> = this.__actions.ofType(NoteActionTypes.AddNoteRequest).pipe(
    // map((action: AddRequestAction) => action),
    switchMap((action: AddNoteRequestAction) =>
      of(this.__firestore.collection<Note>(this.__notesCollectionPath).add({added: action.timestamp, updated: action.timestamp, text: action.text} as Note))),
    map(request => new AddNoteSuccessAction()),
    catchError(error => of(new AddNoteFailAction(error)))
  );

  @Effect()
  update$: Observable<Action> = this.__actions.ofType(NoteActionTypes.UpdateNoteRequest).pipe(
    // map((action: UpdateRequestAction) => action),
    mergeMap((action: UpdateNoteRequestAction) =>
      of(this.__firestore.collection<Note>(this.__notesCollectionPath).doc(action.id).set({updated: action.timestamp, text: action.text}, {merge: true}))),
    map(request => new UpdateNoteSuccessAction()),
    catchError(error => of(new UpdateNoteFailAction(error)))
  );

  ngOnDestroy() {
    if (this.__userSubscription) {
      this.__userSubscription.unsubscribe();
    }
  }
}
