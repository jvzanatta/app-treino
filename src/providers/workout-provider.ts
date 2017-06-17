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
    // console.log('Hello WorkoutProvider Provider');
  }

  public static getGivenWorkouts() {
    let givenArray = JSON.parse(localStorage.getItem('givenWorkouts'));

    console.log(givenArray);
    return this.getWorkouts().filter(workout => {
      console.log(workout);
      return givenArray.includes(workout.id);
    });
  }

  public static getCreatedWorkouts() {
    let createdArray = JSON.parse(localStorage.getItem('createdWorkouts'));
    return this.getWorkouts().filter(workout => createdArray.includes(workout.id));
  }

  private static getWorkouts() {
    return JSON.parse(localStorage.getItem('workouts')) || [];
  }

  private static getWorkout(workoutId) {
    return this.getWorkouts().find(workout => workout.id == workoutId);
  }

  public static editWorkout() {

  }

  public static clearWorkoutDay(workoutId, day) {
    console.log('clearWorkoutDay', workoutId, day);

    let workout = this.getWorkout(workoutId);

    workout.exercises = workout.exercises.filter(exercise => exercise.pivot.day != day);

    console.log('updatedWorkout', workout);

    this.updateLocaly(workout);

    return workout;
  }

  private static updateLocaly(updatedWorkout) {
    console.log('updateLocaly');

    let workouts = this.getWorkouts().map(
      workout => {
        console.log(workout.id, updatedWorkout.id);
        if (workout.id === updatedWorkout.id) {
          console.log(workout.exercises.length);
          console.log(updatedWorkout.exercises.length);

          workout = updatedWorkout;
        }
        return workout;
      });

    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

}
