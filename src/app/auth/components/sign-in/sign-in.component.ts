import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth-service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnDestroy {

  private userSubscription: Subscription;

  constructor(
    private readonly authService: AuthService,
  ) {
    this.userSubscription = this.authService.user$.subscribe(
      (user) => {
        if (user) {
          this.authService.redirectToMainPage();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
