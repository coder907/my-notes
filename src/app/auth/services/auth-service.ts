import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private __user$: Observable<firebase.User>;

  constructor(
    private __router: Router,
    private __afAuth: AngularFireAuth
  ) {
    this.__user$ = this.__afAuth.authState;
  }

  get user$() {
    return this.__user$;
  }

  redirectToSignInPage() {
    this.__router.navigate(['signin']);
  }

  redirectToMainPage() {
    this.__router.navigate(['']);
  }

  signOut() {
    this.__afAuth.auth.signOut();
    this.redirectToSignInPage();
  }
}
