import { Component } from '@angular/core';

import { AuthService } from '../../services/auth-service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

  constructor(
    private __authService: AuthService,
  ) { }

  onSignInSuccess(event) {
    this.__authService.redirectToMainPage();
  }

  signInFailure(error) {
    console.log('Error while signing in: ' + error);
  }
}
