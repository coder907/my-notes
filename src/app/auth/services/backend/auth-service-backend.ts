import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthServiceBackendBase } from './auth-service-backend-base';
import { User } from '../../models/user';



@Injectable({
  providedIn: 'root',
})
export class AuthServiceBackend extends AuthServiceBackendBase {

  get user$(): Observable<User> {
    return null;
  }

  async signIn(userName: string, password: string): Promise<boolean> {
    return false;
  }

  async signOut(): Promise<boolean> {
    return false;
  }
}
