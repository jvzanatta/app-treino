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
import { TestProvider } from '../providers/test/test';


// import { WeekdayPipe } from '../pipes/weekday.pipe';
// import { ActiveOnlyPipe } from '../pipes/active-only.pipe';
// import { ExercisesAssortPipe } from '../pipes/exercises-assort.pipe';


// // import { DatePicker } from '../components/date-picker/date-picker.component';


// import { AboutPage } from '../pages/about/about';
// import { WorkoutPage } from '../pages/workout/workout-page';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
// import { LoginPage } from '../pages/login/login';

// import { WorkoutsList } from '../pages/workouts-list/workouts-list';


@NgModule({
  declarations: [
    MyApp,

    // DatePicker,

    // WeekdayPipe,
    // ActiveOnlyPipe,
    // ExercisesAssortPipe,

    // AboutPage,
    // ContactPage,
    // WorkoutPage,
    // HomePage,
    // LoginPage,

    // WorkoutsList
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

    // AboutPage,
    // ContactPage,
    // WorkoutPage,
    // HomePage,
    // LoginPage,

    // WorkoutsList
  ],

  providers: [
    LoginProvider,
    UserProvider,
    WorkoutProvider,
    ExerciseProvider,
    HttpInterceptor,
    TestProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
