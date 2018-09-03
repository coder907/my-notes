import { NgModule } from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';

import { AuthGuardService } from '../auth/services/auth-guard.service';
import { MainComponent } from './containers/main/main.component';
import { NotesManagerComponent } from './containers/notes-manager/notes-manager.component';
import { TagsManagerComponent } from './containers/tags-manager/tags-manager.component';
import { SettingsManagerComponent } from './containers/settings-manager/settings-manager.component';



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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
