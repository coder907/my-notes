import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSortModule,
} from '@angular/material';

import { ListComponent } from './components/list/list.component';
import { PostComponent } from './components/post/post.component';
import { DblClickOrPressDirective } from '../directives/dblclickorpress.directive';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from '../../config/hammer';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
  ],
  declarations: [
    ListComponent,
    PostComponent,
    DblClickOrPressDirective,
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig
  }],
  exports: [
    ListComponent,
    PostComponent,
    DblClickOrPressDirective,
  ]
})
export class CoreComponentsModule {}
