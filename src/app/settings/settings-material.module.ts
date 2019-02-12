import { NgModule } from '@angular/core';

import {
  MatFormFieldModule,
  MatSelectModule,
  MatSlideToggleModule,
} from '@angular/material';



@NgModule({
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  exports: [
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule
  ]
})
export class SettingsMaterialModule {}
