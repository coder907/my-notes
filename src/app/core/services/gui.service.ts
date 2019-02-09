import { Injectable } from '@angular/core';

import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';

import {
  MatSidenav,
  MatSnackBar
} from '@angular/material';

import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class GuiService {

  private isHandsetValue$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  private sidenav: MatSidenav;
  private snackBar: MatSnackBar;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {}

  get isHandset$(): Observable<BreakpointState> {
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

  showNotification(message: string)  {
    this.snackBar.open(message, 'DISMISS', {
      duration: 0,
      verticalPosition: 'top',
    });
  }

  showQuickNotification(message: string)  {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  showNotYetImplemented() {
    this.showQuickNotification('Not yet implemented.');
  }
}
