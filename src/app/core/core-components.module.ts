import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatSortModule,
} from '@angular/material';

import { ListComponent } from './components/list/list.component';
import { DblClickOrPressDirective } from '../shared/directives/dblclick-or-press.directive';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from '../../config/hammer';



@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule
  ],
  declarations: [
    ListComponent,
    DblClickOrPressDirective
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig,
  }],
  exports: [
    ListComponent,
    DblClickOrPressDirective
  ]
})
export class CoreComponentsModule { }
