import { NgModule } from '@angular/core';

import {
  Routes,
  RouterModule,
} from '@angular/router';

import { SettingsManagerComponent } from './containers/settings-manager/settings-manager.component';



const routes: Routes = [
  {
    path: '',
    component: SettingsManagerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
