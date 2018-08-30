import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes,
} from '@angular/router';

import { AuthGuardService } from './auth/services/auth-guard.service';
import { LoginComponent } from './auth/components/login/login.component';
import { MainComponent } from './core/components/main/main.component';



const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
