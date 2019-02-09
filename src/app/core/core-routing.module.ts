import { NgModule } from '@angular/core';

import {
  Routes,
  RouterModule,
} from '@angular/router';

import { MainComponent } from './containers/main/main.component';



const routes: Routes = [
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
        loadChildren: '../notes/notes.module#NotesModule',
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsModule',
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
