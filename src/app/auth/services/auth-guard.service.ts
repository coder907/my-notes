import { Injectable } from '@angular/core';

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import {
  map,
  take
} from 'rxjs/operators';

import { AuthService } from './auth-service';



// TODO: use NGRX effects!
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(
    private __router: Router,
    private __authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.__authService.user$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          // this.__router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          this.__router.navigate(['/login']);
          return true;
        }
      }),
      take(1)
    );
  }
}
