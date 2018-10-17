import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSortModule,
} from '@angular/material';

import { StaticListComponent } from './components/static-list/static-list.component';
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
    StaticListComponent,
    PostComponent,
    DblClickOrPressDirective,
  ],
  exports: [
    StaticListComponent,
    PostComponent,
    DblClickOrPressDirective,
  ]
})
export class CoreComponentsModule {}
