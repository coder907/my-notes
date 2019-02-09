import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreMaterialModule } from './core-material.module';
import { CoreComponentsModule } from './core-components.module';
import { MainComponent } from './containers/main/main.component';
import { MenuComponent } from './containers/menu/menu.component';



@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    CoreMaterialModule,
    CoreComponentsModule
  ],
  declarations: [
    MainComponent,
    MenuComponent
  ],
})
export class CoreModule {}
