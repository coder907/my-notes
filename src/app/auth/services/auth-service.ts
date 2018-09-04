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



@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {

  private __user: User = null;
  private __user$: Observable<User>;

  private __userName$: Observable<string>;

  private __userSubscription: Subscription;

  constructor(
    private __router: Router,
    private __angularFireAuth: AngularFireAuth
  ) {
    this.__user$ = this.__angularFireAuth.authState;

    this.__userSubscription = this.__user$.subscribe(
      (user) => {
        this.__user = user;
      }
    );
  }

  get user() {
    return this.__user;
  }

  get user$() {
    return this.__user$;
  }

  get userName$() {
    if (!this.__userName$) {
      this.__userName$ = this.__user$.pipe(
        map(user => {
          if (user.isAnonymous) {
            return 'Guest';

          } else {
            return user.displayName;
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

  redirectIfSignedIn() {
    if (this.__user) {
      this.redirectToMainPage();
    }
  }

  signOut() {
    this.__angularFireAuth.auth.signOut();
    this.redirectToSignInPage();
  }
}
