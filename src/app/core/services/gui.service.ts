import { Injectable } from '@angular/core';

import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';

import {
  MatSidenav,
  MatSnackBar
} from '@angular/material';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class GuiService {

  private isHandsetValue$: Observable<boolean>;

  private sidenav: MatSidenav;
  private snackBar: MatSnackBar;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
  ) { }

  get isHandset$(): Observable<boolean> {
    if (!this.isHandsetValue$) {
      this.isHandsetValue$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(state => state.matches)
      );
    }

    return this.isHandsetValue$;
  }

  init(
    sidenav: MatSidenav,
    snackBar: MatSnackBar,
  ) {
    this.sidenav = sidenav;
    this.snackBar = snackBar;
  }

  closeSidenav() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'DISMISS', {
      duration: 0,
      verticalPosition: 'top',
    });
  }

  showQuickNotification(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  showNotYetImplemented() {
    this.showQuickNotification('The feature is not implemented yet.');
  }

  setIsDayTheme(isDayTheme: boolean) {
    const theme = isDayTheme ? 'day-theme' : 'night-theme';
    document.getElementById('theme-container').className = theme;
  }
}
