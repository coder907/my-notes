import {
  Injectable,
} from '@angular/core';

import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../core/store';
import { SignOutAction } from '../store/actions/sign-out.action';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly userValue$ = new BehaviorSubject<User>(null);

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {
    const user = {
      signedIn: true,
    } as User;

    this.userValue$.next(user);
  }

  get user$() {
    return this.userValue$.asObservable();
  }

  redirectToSignInPage() {
    this.router.navigate(['signin']);
  }

  redirectToMainPage() {
    this.router.navigate(['']);
  }

  signOut() {
    this.store.dispatch(new SignOutAction());
    this.redirectToSignInPage();
  }
}
