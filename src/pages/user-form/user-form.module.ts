import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFormPage } from './user-form';
import { DecimalPipe, PercentPipe } from '@angular/common';

@NgModule({
  declarations: [
    UserFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserFormPage),
  ],
  exports: [
    UserFormPage
  ],
  providers: [
    DecimalPipe,
    PercentPipe
  ]
})
export class UserFormPageModule {}
