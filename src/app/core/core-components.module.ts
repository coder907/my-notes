import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSortModule,
} from '@angular/material';

import { StaticListComponent } from './components/static-list/static-list.component';
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
    StaticListComponent,
    ListComponent,
    PostComponent,
    DblClickOrPressDirective,
  ],
  exports: [
    StaticListComponent,
    ListComponent,
    PostComponent,
    DblClickOrPressDirective,
  ]
})
export class CoreComponentsModule {}
