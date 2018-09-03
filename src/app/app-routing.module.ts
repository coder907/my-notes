import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes,
} from '@angular/router';

import { AuthGuardService } from './auth/services/auth-guard.service';



const routes: Routes = [
  {
    path: 'signin',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '',
    loadChildren: './core/core.module#CoreModule',
    canActivate: [AuthGuardService]
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
