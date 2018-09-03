import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import {
  map,
  take
} from 'rxjs/operators';

import { Observable } from 'rxjs';

import { AuthService } from './auth-service';



// TODO: use NGRX effects
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(
    private __authService: AuthService
  ) {}

  canActivate(): Observable<boolean> {
    return this.__authService.user$.pipe(
      map(user => {
        if (user) {
          return true;

        } else {
          this.__authService.redirectToSignInPage();
          return false;
        }
      }),
      take(1)
    );
  }
}
