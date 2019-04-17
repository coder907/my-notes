import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthMaterialModule } from './auth-material.module';
import { AuthPageComponent } from './containers/auth-page/auth-page.component';
import { SignInComponent } from './components/sign-in/sign-in.component';



@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthMaterialModule
  ],
  declarations: [
    AuthPageComponent,
    SignInComponent
  ],
})
export class AuthModule {}
