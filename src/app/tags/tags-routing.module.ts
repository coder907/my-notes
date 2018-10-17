import { NgModule } from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';

import { TagsManagerComponent } from './containers/tags-manager/tags-manager.component';



const routes: Routes = [
  {
    path: '',
    component: TagsManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule {}
