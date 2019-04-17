import { Injectable } from '@angular/core';

import {
  Observable,
  BehaviorSubject,
} from 'rxjs';

import * as timeoutUtil from 'src/app/shared/utils/timeout-util';
import { AuthServiceBackendBase } from './auth-service-backend-base';
import { User } from '../../models/user';



@Injectable({
  providedIn: 'root',
})
export class AuthServiceBackendMock extends AuthServiceBackendBase {

  private readonly shortDelayMs = 1000;
  private readonly userValue$ = new BehaviorSubject<User>(null);

  get user$(): Observable<User> {
    return this.userValue$.asObservable();
  }

  async signIn(userName: string, password: string): Promise<boolean> {
    await timeoutUtil.sleep(this.shortDelayMs);

    if (userName === 'user' && password === 'test') {
      const user: User = {
        id: '1',
        name: 'User',
      };

      this.userValue$.next(user);
      return true;
    } else {
      console.log('Username and password combination not valid.');
      return false;
    }
  }

  async signOut(): Promise<boolean> {
    this.userValue$.next(null);
    return true;
  }
}
