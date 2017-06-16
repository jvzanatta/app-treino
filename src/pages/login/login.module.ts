import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { LoginPage } from './login';
import { LoginProvider } from '../../providers/login-provider';

@NgModule({
  declarations: [ LoginPage ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  // exports: [
  //   LoginPage
  // ],
  providers: [
    LoginProvider
  ]
})
export class LoginPageModule {}
