import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ContactPage } from './contact';

import { PipesModule } from '../../pipes/pipes.module';
import { NgStringPipesModule } from 'angular-pipes';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ ContactPage ],
  imports: [
    PipesModule,
    NgStringPipesModule,
    ComponentsModule,
    IonicPageModule.forChild(ContactPage),
  ],
})
export class ContactPageModule {}
