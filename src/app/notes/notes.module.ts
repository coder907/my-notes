import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { NotesRoutingModule } from './notes-routing.module';
import { CoreComponentsModule } from '../core/core-components.module';
import { NoteEffects } from './effects/note';
import { NotesManagerComponent } from './containers/notes-manager/notes-manager.component';



@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule,
    CoreComponentsModule,
    EffectsModule.forFeature([NoteEffects])
  ],
  declarations: [
    NotesManagerComponent
  ],
})
export class NotesModule { }
