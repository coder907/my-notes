import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsMaterialModule } from './settings-material.module';
import { SettingsManagerComponent } from './containers/settings-manager/settings-manager.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SettingsMaterialModule
  ],
  declarations: [
    SettingsManagerComponent
  ],
})
export class SettingsModule {}
