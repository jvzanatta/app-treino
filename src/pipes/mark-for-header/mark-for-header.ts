import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MarkForHeaderPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'markForHeader',
})
export class MarkForHeaderPipe implements PipeTransform {

  transform(exercises: Array<any>) {
    let returnEx = exercises.map((exercise, index, exercises) => {
      if (index === 0 || exercises[index-1].exercise_group_id != exercise.exercise_group_id) {
        exercise.first = true;
      }
      return exercise;
    });

    return returnEx.length > 0 ? returnEx : [{ name: 'Nenhum exercício' }];
  }
}
