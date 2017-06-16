import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'exercisesAssort'})
export class ExercisesAssortPipe implements PipeTransform {

  transform(exercises: Array<any>, day: string): Array<any> {
    let groups = [];

    exercises.forEach(exercise => {
      if (exercise.pivot.day === day) {
        let id = exercise.group.id;

        if (!groups.find(group => group.id === id)) {
          groups.push(exercise.group);
          groups.find(group => group.id === id).exercises = [exercise];
        } else {
          groups.find(group => group.id === id).exercises.push(exercise);
        }
      }
    });

    console.log(groups);

    return groups;
  }
}
