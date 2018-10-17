import { NgModule } from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';

import { NotesManagerComponent } from './containers/notes-manager/notes-manager.component';



const routes: Routes = [
  {
    path: '',
    component: NotesManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule {}
