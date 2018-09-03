import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseUIModule } from 'firebaseui-angular';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from '../config/hammer';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { MainComponent } from './core/containers/main/main.component';
import { MenuComponent } from './core/containers/menu/menu.component';
import { NotesManagerComponent } from './core/containers/notes-manager/notes-manager.component';
import { TagsManagerComponent } from './core/containers/tags-manager/tags-manager.component';
import { SettingsManagerComponent } from './core/containers/settings-manager/settings-manager.component';
import { PostComponent } from './core/components/post/post.component';
import { ListComponent } from './core/components/list/list.component';
import { DblClickOrPressDirective } from '../shared/directives/dblclickorpress.directive';
import { FlexHeightDirective } from '../shared/directives/flex-height.directive';
import { FixHeaderDirective } from './core/components/list/directives/fix-header.directive';
import { NoteEffects } from './core/effects/note';
import { environment } from '../environments/environment';
import { reducers } from './core/store';



@NgModule({
  declarations: [
    // Components
    AppComponent,
    SignInComponent,
    MainComponent,
    MenuComponent,
    NotesManagerComponent,
    TagsManagerComponent,
    SettingsManagerComponent,
    PostComponent,
    ListComponent,
    // Directives
    DblClickOrPressDirective,
    FlexHeightDirective,
    FixHeaderDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'My Notes DevTools',
      // logOnly: environment.production,
      maxAge: 10
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(environment.firebaseUiAuthConfig),
    AngularFirestoreModule.enablePersistence(),
    EffectsModule.forRoot([NoteEffects]),
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
