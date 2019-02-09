import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsManagerComponent } from './containers/settings-manager/settings-manager.component';



@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsManagerComponent
  ],
})
export class SettingsModule { }
