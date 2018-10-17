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
  exports: [
    ListComponent,
    PostComponent,
    DblClickOrPressDirective,
  ]
})
export class CoreComponentsModule {}
