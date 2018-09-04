import {
  Injectable,
  OnDestroy
} from '@angular/core';

import { Router } from '@angular/router';

import {
  Observable,
  Subscription
} from 'rxjs';

import { map } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Store } from '@ngrx/store';

import * as fromCoreStore from '../../core/store';
import { SignOutAction } from '../../core/store/auth';



@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {

  private __user$: Observable<User>;
  private __userName$: Observable<string>;
  private __userSubscription: Subscription;

  constructor(
    private __router: Router,
    private __angularFireAuth: AngularFireAuth,
    private __store: Store<fromCoreStore.State>
  ) {
    this.__user$ = this.__angularFireAuth.authState;
  }

  get user$(): Observable<User> {
    return this.__user$;
  }

  get userName$(): Observable<string> {
    if (!this.__userName$) {
      this.__userName$ = this.user$.pipe(
        map(user => {
          if (user) {
            if (user.isAnonymous) {
              return 'Guest';

            } else {
              return user.displayName;
            }
          } else {
            return '';
          }
        })
      );
    }

    return this.__userName$;
  }

  ngOnDestroy() {
    if (this.__userSubscription) {
      this.__userSubscription.unsubscribe();
    }
  }

  redirectToSignInPage() {
    this.__router.navigate(['signin']);
  }

  redirectToMainPage() {
    this.__router.navigate(['']);
  }

  signOut() {
    this.__angularFireAuth.auth.signOut();
    this.__store.dispatch(new SignOutAction());
    this.redirectToSignInPage();
  }
}
