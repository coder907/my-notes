import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  Observable,
  BehaviorSubject,
} from 'rxjs';

import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as timeoutUtil from 'src/app/shared/utils/timeout-util';
import { AuthServiceBackendBase } from './backend/auth-service-backend-base';
import { AuthServiceBackendMock } from './backend/auth-service-backend-mock';
// import { AuthServiceBackend } from './backend/auth-service-backend';
import { User } from '../models/user';
import { SignOutAction } from '../redux/actions/sign-out';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly authServiceBackend: AuthServiceBackendBase;
  private readonly isAuthenticatingValue$ = new BehaviorSubject<boolean>(false);
  private readonly authNotValidSignalValue$ = new BehaviorSubject<boolean>(false);
  private userSnapshotValue: User = null;

  constructor(
    private readonly router: Router,
    private readonly store: Store<User>,
    authServiceBackend: AuthServiceBackendMock,
    // authServiceBackend: AuthServiceBackend,
  ) {
    this.authServiceBackend = authServiceBackend;
  }

  private userValue$: Observable<User>;

  get user$(): Observable<User> {
    if (!this.userValue$) {
      this.userValue$ = this.authServiceBackend.user$.pipe(
        tap(user => this.userSnapshotValue = user),
      );
    }
    return this.userValue$;
  }

  get user(): User {
    return this.userSnapshotValue;
  }

  get isAuthenticating$(): Observable<boolean> {
    return this.isAuthenticatingValue$.asObservable();
  }

  get authNotValidSignal$(): Observable<boolean> {
    return this.authNotValidSignalValue$.asObservable();
  }

  redirectToSignInPage() {
    this.router.navigate(['signin']);
  }

  redirectToMainPage() {
    this.router.navigate(['']);
  }

  async signIn(userName: string, password: string): Promise<boolean> {
    if (this.userSnapshotValue) {
      console.log('You are already signed in.');
      return;
    }

    this.isAuthenticatingValue$.next(true);

    const success = await this.authServiceBackend.signIn(userName, password);

    if (success) {
      this.redirectToMainPage();

      timeoutUtil.delay(() => {
        this.isAuthenticatingValue$.next(false);
      }, 500);

      return true;

    } else {
      this.isAuthenticatingValue$.next(false);
      this.authNotValidSignalValue$.next(true);

      timeoutUtil.delay(() => {
        this.authNotValidSignalValue$.next(false);
      }, 750);

      return false;
    }
  }

  async signOut(): Promise<boolean> {
    const success = await this.authServiceBackend.signOut();

    if (success) {
      this.userSnapshotValue = null;
      this.store.dispatch(new SignOutAction());
      this.redirectToSignInPage();
      return true;
    } else {
      console.log('Unable to sign out.');
      return false;
    }
  }
}
