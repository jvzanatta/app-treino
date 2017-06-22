import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'weekday'})
export class WeekdayPipe implements PipeTransform {

  private weekday: Array<string>         = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  private weekdayFullname: Array<string> = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  private weekdayLetter: Array<string>   = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  transform(value: string, format: string, separator: string = ' '): string {
    let formatArray: Array<string>;

    if (!!value) {
      switch(format) {
        case null:
        case undefined:
        case 'short':
          formatArray = this.weekday;
          break;
        case 'fullname':
          formatArray = this.weekdayFullname;
          break;
        case 'letter':
          formatArray = this.weekdayLetter;
        default:
          console.log('nenhum deles');
      }
    }

    return formatArray.filter((day, index) => value.includes(index.toString())).join(separator) || '';
  }
}
