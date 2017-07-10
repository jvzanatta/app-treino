import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { CallNumber } from '@ionic-native/call-number';
import { Contacts } from '@ionic-native/contacts';

import { HttpModule }    from '@angular/http';

import { PipesModule } from '../pipes/pipes.module';
import { NgStringPipesModule } from 'angular-pipes';

import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { WorkoutProvider } from '../providers/workout/workout';

import { HttpHandler } from '../providers/http/http';
import { LoadingProvider } from '../providers/loading/loading';
import { SportProvider } from '../providers/sport/sport';
import { ExerciseProvider } from '../providers/exercise/exercise';
import { WeekdayProvider } from '../providers/weekday/weekday';
import { ContactProvider } from '../providers/contact/contact';
import { ChatProvider } from '../providers/chat/chat';


@NgModule({
  declarations: [
    MyApp,
  ],

  imports: [
    HttpModule,
    PipesModule,
    NgStringPipesModule,
    BrowserModule,

    IonicModule.forRoot(MyApp, {
      preloadModules: true
    }),
    IonicStorageModule.forRoot({
      name: '__FichaApp',
         // driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
  ],

  providers: [
    Facebook,
    CallNumber,
    Contacts,

    AuthProvider,
    UserProvider,
    WorkoutProvider,

    HttpHandler,

    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoadingProvider,
    SportProvider,
    ExerciseProvider,
    WeekdayProvider,
    ContactProvider,
    ChatProvider,
  ]
})
export class AppModule {}
