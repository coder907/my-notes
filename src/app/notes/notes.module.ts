import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesMaterialModule } from './notes-material.module';
import { CoreComponentsModule } from '../core/core-components.module';
import { NotesEffects } from './effects/notes';
import { NotesManagerComponent } from './containers/notes-manager/notes-manager.component';
import { EditComponent } from './components/edit/edit.component';


@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule,
    NotesMaterialModule,
    CoreComponentsModule,
    EffectsModule.forFeature([NotesEffects])
  ],
  declarations: [
    NotesManagerComponent,
    EditComponent
  ],
})
export class NotesModule { }
