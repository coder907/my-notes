import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes,
} from '@angular/router';

import { AuthGuardService } from './auth/services/auth-guard.service';
// import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { MainComponent } from './core/containers/main/main.component';
import { NotesManagerComponent } from './core/containers/notes-manager/notes-manager.component';
import { TagsManagerComponent } from './core/containers/tags-manager/tags-manager.component';
import { SettingsManagerComponent } from './core/containers/settings-manager/settings-manager.component';



const routes: Routes = [
  {
    path: 'signin',
    loadChildren: './auth/auth.module#AuthModule'
    // component: SignInComponent
  },
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'notes',
        component: NotesManagerComponent,
      },
      {
        path: 'tags',
        component: TagsManagerComponent,
      },
      {
        path: 'settings',
        component: SettingsManagerComponent,
      },
    ],
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
