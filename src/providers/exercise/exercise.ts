import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ExerciseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ExerciseProvider {

  constructor(public http: Http) {
    // console.log('Hello ExerciseProvider Provider');
  }

  public static sort(exercises) {
    return exercises.sort((a,b) => {
      if (a.exercise_group_id < b.exercise_group_id) {
        return -1;
      } if (a.exercise_group_id > b.exercise_group_id) {
        return 1;
      } else {
        if (a.name < b.name) {
          return -1;
        } if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }

  public static append(exercise, workout, day) {
    exercise.pivot = {day: day, exercise_id: exercise.id, workout_id: workout.id};
    workout.exercises.push(exercise);
    return this.sort(workout.exercises);
  }

  public static remove(exercise, workout, day) {
    workout.exercises = workout.exercises.filter(ex => {
      return ex.pivot.day != day || ex.id != exercise.id;
    });

    return workout.exercises;
  }

}
