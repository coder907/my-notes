import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth-service';



@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  private __canActivate$: Observable<boolean>;

  constructor(
    private __authService: AuthService
  ) {}

  canActivate(): Observable<boolean> {
    if (!this.__canActivate$) {
      this.__canActivate$ = this.__authService.user$.pipe(
        map(user => {
          if (user) {
            return true;

          } else {
            this.__authService.redirectToSignInPage();
            return false;
          }
        }),
      );
    }

    return this.__canActivate$;
  }
}
