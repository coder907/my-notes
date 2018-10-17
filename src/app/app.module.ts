import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers } from './store';
import { metaReducers } from './store';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    StoreModule.forRoot(reducers, {metaReducers: metaReducers}),
    StoreDevtoolsModule.instrument({
      name: 'My Notes DevTools',
      maxAge: 10
    }),
    EffectsModule.forRoot([]),
  ],

  declarations: [
    AppComponent,
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
