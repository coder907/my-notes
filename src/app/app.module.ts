import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from './material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './core/components/main/app.component';
import { PostComponent } from './core/components/post/post.component';
import { ListComponent } from './core/components/list/list.component';
import { DblClickOrPressDirective } from '../shared/directives/dblclickorpress.directive';
import { FlexHeightDirective } from '../shared/directives/flex-height.directive';
import { FixHeaderDirective } from './core/components/list/directives/fix-header.directive';
import { ItemEffects } from './core/effects/item';
import { reducers } from './core/store';
import { environment } from '../environments/environment';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from '../config/hammer';



@NgModule({
  declarations: [
    // Components
    AppComponent,
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
    MaterialModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'My Notes DevTools',
      // logOnly: environment.production,
      maxAge: 10
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    EffectsModule.forRoot([ItemEffects]),
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
