import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactList } from './contact-list';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ContactList,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(ContactList),
  ],
  exports: [
    ContactList
  ]
})
export class ContactListModule {}
