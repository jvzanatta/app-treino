import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { HttpModule }    from '@angular/http';

import { PipesModule } from '../pipes/pipes.module';

import { LoginProvider } from '../providers/login/login';
import { UserProvider } from '../providers/user/user';
import { WorkoutProvider } from '../providers/workout/workout';

import { HttpHandler } from '../providers/http/http';
import { LoadingProvider } from '../providers/loading/loading';
import { SportProvider } from '../providers/sport/sport';
import { ExerciseProvider } from '../providers/exercise/exercise';
import { WeekdayProvider } from '../providers/weekday/weekday';



@NgModule({
  declarations: [
    MyApp,
  ],

  imports: [
    HttpModule,
    PipesModule,
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
    LoginProvider,
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
  ]
})
export class AppModule {}
