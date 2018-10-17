import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebaseui from 'firebaseui';

import { Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth-service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit, OnDestroy {

  private __firebaseUiInstance: firebaseui.auth.AuthUI;
  private __userSubscription: Subscription;

  constructor(
    private __angularFireAuth: AngularFireAuth,
    private __authService: AuthService,
  ) {
    const windowRef = window as any;

    if (!windowRef.firebaseUiInstance) {
      windowRef.firebaseUiInstance = new firebaseui.auth.AuthUI(__angularFireAuth.auth);
    }

    this.__firebaseUiInstance = windowRef.firebaseUiInstance as firebaseui.auth.AuthUI;

    this.__userSubscription = this.__authService.user$.subscribe(
      (user) => {
        if (user) {
          this.__authService.redirectToMainPage();
        }
      }
    );
  }

  ngOnInit() {
    if (this.__firebaseUiInstance) {
      this.__firebaseUiInstance.start('#firebaseui-auth-container', environment.firebaseUiAuthConfig);
    }
  }

  ngOnDestroy() {
    if (this.__userSubscription) {
      this.__userSubscription.unsubscribe();
    }
  }
}
