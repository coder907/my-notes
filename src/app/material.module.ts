import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatSortModule,
  MatSidenavModule,
  MatListModule,
} from '@angular/material';



@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
  ]
})
export class MaterialModule {}
