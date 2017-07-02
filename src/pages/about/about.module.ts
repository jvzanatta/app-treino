import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AboutPage } from './about';

import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ AboutPage ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(AboutPage),
  ],
  // exports: [ AboutPage ],
})
export class AboutPageModule {}
