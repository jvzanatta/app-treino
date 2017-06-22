import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ContactPage } from './contact';

import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ ContactPage ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(ContactPage),
  ],
})
export class ContactPageModule {}
