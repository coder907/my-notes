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

  private __isHandset$: Observable<BreakpointState> = this.__breakpointObserver.observe(Breakpoints.Handset);

  private __sidenav: MatSidenav;
  private __snackBar: MatSnackBar;

  constructor(
    private __breakpointObserver: BreakpointObserver,
  ) {}

  get isHandset$(): Observable<BreakpointState> {
    return this.__isHandset$;
  }

  init(
    sidenav: MatSidenav,
    snackBar: MatSnackBar,
  ) {
    this.__sidenav = sidenav;
    this.__snackBar = snackBar;
  }

  closeSidenav() {
    if (this.__sidenav) {
      this.__sidenav.close();
    }
  }

  showNotification(message: string)  {
    this.__snackBar.open(message, 'DISMISS', {
      duration: 0,
      verticalPosition: 'top',
    });
  }

  showQuickNotification(message: string)  {
    this.__snackBar.open(message, undefined, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  showNotYetImplemented() {
    this.showQuickNotification('Not yet implemented.');
  }
}
