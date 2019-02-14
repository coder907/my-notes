import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSortModule,
} from '@angular/material';

import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { DblClickOrPressDirective } from '../shared/directives/dblclick-or-press.directive';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from '../../config/hammer';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule
  ],
  declarations: [
    ListComponent,
    EditComponent,
    DblClickOrPressDirective
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig,
  }],
  exports: [
    ListComponent,
    EditComponent,
    DblClickOrPressDirective
  ]
})
export class CoreComponentsModule { }
