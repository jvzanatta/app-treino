import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpModule }    from '@angular/http';

import { LoginProvider } from '../providers/login-provider'
import { UserProvider } from '../providers/user-provider.ts'
import { WorkoutProvider } from '../providers/workout-provider.ts'
import { ExerciseProvider } from '../providers/exercise-provider.ts'
import { HttpInterceptor } from '../providers/http-interceptor-provider.ts'

import { WeekdayPipe } from '../providers/weekday.pipe.ts'

import { AboutPage } from '../pages/about/about';
import { WorkoutPage } from '../pages/workout/workout-page';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    WeekdayPipe,
    AboutPage,
    ContactPage,
    WorkoutPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    WorkoutPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  providers: [
    LoginProvider,
    UserProvider,
    WorkoutProvider,
    ExerciseProvider,
    HttpInterceptor,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
