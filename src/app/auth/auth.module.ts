import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseUIModule } from 'firebaseui-angular';

import { environment } from '../../environments/environment';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';



@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FirebaseUIModule.forRoot(environment.firebaseUiAuthConfig),
  ],
  declarations: [
    SignInComponent,
  ],
})
export class AuthModule {}
