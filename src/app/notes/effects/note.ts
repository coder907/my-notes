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
  tap,
} from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { AuthService } from '../../auth/services/auth-service';
import { FirestoreAction } from '../../core/models/firestore-action';

import { Note } from '../models/note';
import { NoteActionTypes } from '../store/actions';
import { SyncNotesAddAction } from '../store/actions/sync-notes-add.action';
import { SyncNotesUpdateAction } from '../store/actions/sync-notes-update.action';
import { SyncNotesRemoveAction } from '../store/actions/sync-notes-remove.action';
import { RemoveNoteRequestAction } from '../store/actions/remove-note-request.action';
import { RemoveNoteSuccessAction } from '../store/actions/remove-note-success.action';
import { RemoveNoteFailAction } from '../store/actions/remove-note-fail.action';
import { AddNoteRequestAction } from '../store/actions/add-note-request.action';
import { AddNoteSuccessAction } from '../store/actions/add-note-success.action';
import { AddNoteFailAction } from '../store/actions/add-note-fail.action';
import { UpdateNoteRequestAction } from '../store/actions/update-note-request.action';
import { UpdateNoteSuccessAction } from '../store/actions/update-note-success.action';
import { UpdateNoteFailAction } from '../store/actions/update-note-fail.action';



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
  sync$: Observable<Action> = this.__actions.pipe(
    ofType(NoteActionTypes.SyncNotesRequest),

    switchMap(a => this.__firestore.collection<Note>(this.__notesCollectionPath).stateChanges().pipe(

      mergeMap(actions => actions),

      map(action => {
        switch (action.type) {
          case FirestoreAction.Added:
            return new SyncNotesAddAction(
              {
                id: action.payload.doc.id,
                ...action.payload.doc.data()
              } as Note);

          case FirestoreAction.Modified:
            return new SyncNotesUpdateAction(
              {
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
  remove$: Observable<Action> = this.__actions.pipe(
    ofType(NoteActionTypes.RemoveNoteRequest),

    map((action: RemoveNoteRequestAction) => action.id),

    switchMap(id => of(
      this.__firestore.collection<Note>(this.__notesCollectionPath).doc(id).delete()
    )),

    map(request => new RemoveNoteSuccessAction()),

    catchError(error => of(new RemoveNoteFailAction(error)))
  );

  @Effect()
  add$: Observable<Action> = this.__actions.pipe(
    ofType(NoteActionTypes.AddNoteRequest),

    switchMap((action: AddNoteRequestAction) =>
      of(
        this.__firestore
          .collection<Note>(this.__notesCollectionPath)
          .add(
            {
              added: action.timestamp,
              updated: action.timestamp,
              text: action.text,
            } as Note)
        )
    ),

    map(request => new AddNoteSuccessAction()),

    catchError(error => of(new AddNoteFailAction(error)))
  );

  @Effect()
  update$: Observable<Action> = this.__actions.pipe(
    ofType(NoteActionTypes.UpdateNoteRequest),

    mergeMap((action: UpdateNoteRequestAction) =>
      of(this.__firestore.collection<Note>(this.__notesCollectionPath)
        .doc(action.id)
        .set(
          {
            updated: action.timestamp,
            text: action.text,
          },
          {
            merge: true
          }
        )
      )
    ),

    map(request => new UpdateNoteSuccessAction()),

    catchError(error => of(new UpdateNoteFailAction(error)))
  );

  @Effect({ dispatch: false })
  init$: Observable<any> = defer(() => of(null)).pipe(
    tap(() => console.log('NoteEffects: init$'))
  );

  ngOnDestroy() {
    if (this.__userSubscription) {
      this.__userSubscription.unsubscribe();
    }
  }
}
