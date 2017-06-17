import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule }    from '@angular/http';

import { LoginProvider } from '../providers/login-provider';
import { UserProvider } from '../providers/user-provider';
import { WorkoutProvider } from '../providers/workout-provider';
import { ExerciseProvider } from '../providers/exercise-provider';

import { HttpInterceptor } from '../providers/http-interceptor-provider';


@NgModule({
  declarations: [
    MyApp,
  ],

  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true
    })
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
  ],

  providers: [
    LoginProvider,
    UserProvider,
    WorkoutProvider,
    ExerciseProvider,

    HttpInterceptor,

    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
