import { NgModule } from '@angular/core';

import {
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSlideToggleModule,
} from '@angular/material';



@NgModule({
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  exports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule
  ]
})
export class SettingsMaterialModule {}
