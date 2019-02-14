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

  private readonly handsetBreakpoints = [Breakpoints.XSmall];
  private readonly widescreenBreakpoints = [Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge];

  private isHandsetValue$: Observable<boolean>;
  private isWidescreeValue$: Observable<boolean>;

  private sidenav: MatSidenav;
  private snackBar: MatSnackBar;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
  ) { }

  get isHandset(): boolean {
    return this.breakpointObserver.isMatched(this.handsetBreakpoints);
  }

  get isHandset$(): Observable<boolean> {
    if (!this.isHandsetValue$) {
      this.isHandsetValue$ = this.breakpointObserver
        .observe(this.handsetBreakpoints)
        .pipe(
          map(state => state.matches)
        );
    }

    return this.isHandsetValue$;
  }

  get isWidescreen(): boolean {
    return this.breakpointObserver.isMatched(this.widescreenBreakpoints);
  }

  get isWidescreen$(): Observable<boolean> {
    if (!this.isWidescreeValue$) {
      this.isWidescreeValue$ = this.breakpointObserver
        .observe(this.widescreenBreakpoints)
        .pipe(
          map(state => state.matches)
        );
    }

    return this.isWidescreeValue$;
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
    this.showQuickNotification('This feature is not implemented yet.');
  }

  setIsDayTheme(isDayTheme: boolean) {
    const theme = isDayTheme ? 'day-theme' : 'night-theme';
    document.getElementById('theme-container').className = theme;
  }
}
