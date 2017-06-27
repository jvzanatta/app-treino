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

  private endpoint: string = 'workouts/';

  constructor(
    public http:     HttpHandler,
    private storage: Storage,
  ) {
    // console.log('Hello WorkoutProvider Provider');
  }

  public getGivenWorkouts(): Promise<any> {
    console.log('getGivenWorkouts');
    let promise = new Promise((resolve, reject) => {
      this.getWorkouts().then((allWorkouts: Array<any>) => {
        this.storage.get('givenWorkouts')
          .then(givenWorkouts => resolve(allWorkouts.filter(workout => givenWorkouts.includes(workout.id))));
       });
    });
    return promise;
  }

  public getCreatedWorkouts(): Promise<any> {
    console.log('getCreatedWorkouts');
    let promise = new Promise((resolve, reject) => {
      this.getWorkouts().then((allWorkouts: Array<any>) => {
        this.storage.get('createdWorkouts')
          .then(createdWorkouts => resolve(allWorkouts.filter(workout => createdWorkouts.includes(workout.id))));
      });
    });
    return promise;
  }

  private getWorkouts() {
    return this.storage.get('workouts');
  }

  public getWorkoutList(mode: string): Promise<any> {
    return mode === 'coach' ? this.getCreatedWorkouts() : this.getGivenWorkouts();
  }

  public getWorkout(workoutId) {
    return this.getWorkouts()
      .then(allWorkouts => allWorkouts.find(workout => workout.id == workoutId));
  }

  public getDayExercises(workout, day) {
    return workout.exercises.filter(exercise => exercise.pivot.day === day);
  }

  public getDayExerciseKeys(workout, day) {
    return this.getDayExercises(workout, day).map(exercise => exercise = exercise.id);
  }

  public clearWorkoutDay(workout, day): Promise<any> {

    let filter = (exercise) => {
        if (exercise.pivot.day == day) {
          return false;
        } else {
          return true;
        }
      };

    workout.exercises = workout.exercises.filter(filter);

    return this.update(workout);
  }

  public update(workout): Promise<any> {
    return new Promise((resolve, reject) => {
      this.patch(workout).subscribe(updatedWorkout => {
        this.updateLocaly(updatedWorkout).then(workout => resolve(workout));
      });
    });
  }

  private patch(workout) {
    return this.http.patch(this.endpoint + workout.id, workout);
  }

  private updateLocaly(updatedWorkout): Promise<any> {
    let promise =  new Promise((resolve, reject) => {
      this.getWorkouts().then(allWorkouts => {
        allWorkouts = allWorkouts.map(workout => {
          if (workout.id === updatedWorkout.id) {
            return updatedWorkout;
          }
          return workout;
        });

        this.storage
          .set('workouts', allWorkouts)
          .then(() => resolve(updatedWorkout));
      });
    });

    return promise;
  }

}
