import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '../../environments/environment';
import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material.module';
import { EffectsModule } from '@ngrx/effects';
import { NoteEffects } from './effects/note';
import { TagEffects } from './effects/tag';
import { MainComponent } from './containers/main/main.component';
import { MenuComponent } from './containers/menu/menu.component';
import { NotesManagerComponent } from './containers/notes-manager/notes-manager.component';
import { TagsManagerComponent } from './containers/tags-manager/tags-manager.component';
import { SettingsManagerComponent } from './containers/settings-manager/settings-manager.component';
import { PostComponent } from './components/post/post.component';
import { ListComponent } from './components/list/list.component';
import { DblClickOrPressDirective } from '../../shared/directives/dblclickorpress.directive';
import { FixHeaderDirective } from './components/list/directives/fix-header.directive';



@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
    EffectsModule.forFeature([NoteEffects, TagEffects]),
  ],
  declarations: [
    MainComponent,
    MenuComponent,
    NotesManagerComponent,
    TagsManagerComponent,
    SettingsManagerComponent,
    PostComponent,
    ListComponent,
    DblClickOrPressDirective,
    FixHeaderDirective,
  ],
})
export class CoreModule {}
