import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { UserProvider } from '../user/user';
import { SportProvider } from '../sport/sport';
import { ExerciseProvider } from '../exercise/exercise';
import { HttpHandler } from '../http/http';

/*
  Generated class for the WorkoutProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WorkoutProvider {

  constructor(
    public http: HttpHandler,
    private storage: Storage,
  ) {
    // console.log('Hello WorkoutProvider Provider');
  }

  public getGivenWorkouts() {
    return this.getWorkouts().then((allWorkouts: Array<any>) => {
      this.storage.get('givenWorkouts').then(givenWorkouts => {
        allWorkouts.filter(workout => {
          return givenArray.includes(workout.id);
        });
      });

    });
  }

  public getCreatedWorkouts() {
    let createdArray = this.storage.get('createdWorkouts');
    return this.getWorkouts().filter(workout => createdArray.includes(workout.id));
  }

  private getWorkouts() {
    return this.storage.get('workouts');
  }

  public getWorkoutList(mode: string) {
    return mode === 'coach' ? this.getCreatedWorkouts() : this.getGivenWorkouts();
  }

  public getWorkout(workoutId) {
    return this.getWorkouts().find(workout => workout.id == workoutId);
  }

  public getDayExercises(workout, day) {
    return workout.exercises.filter(exercise => exercise.pivot.day === day);
  }

  public getDayExerciseKeys(workout, day) {
    return this.getDayExercises(workout, day).map(exercise => exercise = exercise.id);
  }

  public clearWorkoutDay(workoutId, day) {
    console.log('clearWorkoutDay', workoutId, day);

    let workout = this.getWorkout(workoutId);

    workout.exercises = workout.exercises.filter(exercise => exercise.pivot.day != day);

    // console.log('updatedWorkout', workout);

    this.updateLocaly(workout);

    return workout;
  }

  private updateLocaly(updatedWorkout) {
    console.log('updateLocaly');

    if (updatedWorkout && updatedWorkout.id) {
      let workouts = this.getWorkouts().map(
        workout => {
          if (workout.id === updatedWorkout.id) {
            // console.log('workout.exercises', workout.exercises.length);
            // console.log('updatedWorkout.exercises', updatedWorkout.exercises.length);

            workout = updatedWorkout;
          }
          return workout;
        });

      localStorage.setItem('workouts', JSON.stringify(workouts));
    } else {
      console.log('No updatedWorkout or no id in updatedWorkout.');
    }
  }

  public update(workout) {
    console.log('update');

    this.updateLocaly(workout);
  }

}
