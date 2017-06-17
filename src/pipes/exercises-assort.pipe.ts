import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'exercisesAssort'})
export class ExercisesAssortPipe implements PipeTransform {

  transform(exercises: Array<any>, day: string): Array<any> {
    let groups = [];

    if (exercises) {
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
    }

    if (groups.length === 0) {
      groups.push({name: null, exercises: [{ name: 'Nenhum exercício' }]});
    }

    return groups;
  }
}
