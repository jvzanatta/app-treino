import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserProvider } from './user-provider';

/*
  Generated class for the WorkoutProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WorkoutProvider {

  constructor(public http: Http) {
    console.log('Hello WorkoutProvider Provider');
  }

  public static getWorkoutsList() {
    return UserProvider.getUserInfo().given_workouts;
  }

}
