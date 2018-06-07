import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from './material.module';
import { AppComponent } from './core/components/main/app.component';
import { PostComponent } from './core/components/post/post.component';
import { ListComponent } from './core/components/list/list.component';
// import { ItemEffects } from './core/effects/item';
import { reducers } from './core/store';



@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    ListComponent,
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
    // EffectsModule.forRoot([ItemEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
