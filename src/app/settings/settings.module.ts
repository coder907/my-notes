import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsMaterialModule } from './settings-material.module';
import { SettingsManagerComponent } from './containers/settings-manager/settings-manager.component';
import { SettingsEffects } from './redux/effects/settings';
import { SettingsComponent } from './components/settings/settings.component';
import { reducer } from './redux/reducers';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SettingsMaterialModule,
    StoreModule.forFeature('settings', reducer),
    EffectsModule.forFeature([SettingsEffects])
  ],
  declarations: [
    SettingsManagerComponent,
    SettingsComponent
  ],
})
export class SettingsModule {}
