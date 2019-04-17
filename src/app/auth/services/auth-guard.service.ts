import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  private canActivate$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService
  ) { }

  canActivate(): Observable<boolean> {
    if (!this.canActivate$) {
      this.canActivate$ = this.authService.user$.pipe(
        map(user => {
          if (!user) {
            this.authService.redirectToSignInPage();
          }

          return !!user;
        }),
      );
    }

    return this.canActivate$;
  }
}
