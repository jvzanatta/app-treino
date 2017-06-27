import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

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
// import { ListWithPictureComponent } from '../components/list-with-picture/list-with-picture';



@NgModule({
  declarations: [
    MyApp,
    // ListWithPictureComponent,
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
  ]
})
export class AppModule {}
