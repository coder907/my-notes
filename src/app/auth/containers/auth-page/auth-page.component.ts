import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {

  constructor(
    public readonly authService: AuthService,
  ) {}
}
