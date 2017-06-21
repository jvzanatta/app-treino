import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DayFilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'dayFilter',
})
export class DayFilterPipe implements PipeTransform {

  transform(exercises: Array<any>, day: number) {
    // console.log('DayFilterPipe', exercises, day, exercises.filter(exercise => exercise.pivot.day == day));
    return exercises.filter(exercise => exercise.pivot.day == day);
  }
}
