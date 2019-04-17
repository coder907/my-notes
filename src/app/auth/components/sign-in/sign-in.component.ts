import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { Credentials } from '../../models/credentials';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {

  @Input()
  isAuthenticating: boolean;

  @Input()
  authNotValidSignal: boolean;

  @Output()
  signIn = new EventEmitter<Credentials>();

  @ViewChild('userName')
  private readonly userName: ElementRef;

  @ViewChild('password')
  private readonly password: ElementRef;

  onSignIn() {
    this.signIn.emit({
      userName: this.userName.nativeElement.value.trim(),
      password: this.password.nativeElement.value.trim()
    });
  }
}
