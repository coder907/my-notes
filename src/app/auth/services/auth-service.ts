import { Injectable } from '@angular/core';

import {
  Observable,
  from,
} from 'rxjs';

import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private __user: Observable<firebase.User>;

  constructor(
    private __router: Router,
    private __afAuth: AngularFireAuth
  ) {
    this.__user = this.__afAuth.authState;
  }

  get user$() {
    return this.__user;
  }

  signInAnonymously() {
    this.__afAuth.auth.signInAnonymously().then(
      (result) => {
        this.__router.navigate(['']);
      }
    ).catch(
      (error) => {
        console.log('Error with sign in: ' + error);
      }
    );
  }
}
