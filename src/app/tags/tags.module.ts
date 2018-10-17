import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { TagsRoutingModule } from './tags-routing.module';
import { CoreComponentsModule } from '../core/core-components.module';
import { TagEffects } from './effects/tag';
import { TagsManagerComponent } from './containers/tags-manager/tags-manager.component';



@NgModule({
  imports: [
    CommonModule,
    TagsRoutingModule,
    CoreComponentsModule,
    EffectsModule.forFeature([TagEffects]),
  ],
  declarations: [
    TagsManagerComponent,
  ],
})
export class TagsModule {}
