import { Pipe, PipeTransform } from '@angular/core';
import { WeekdayProvider } from '../providers/weekday/weekday';

@Pipe({name: 'weekday'})
export class WeekdayPipe implements PipeTransform {


  transform(value: string, format: string, separator: string = ' '): string {
    return WeekdayProvider.getList(value, format, separator);
  }
}
