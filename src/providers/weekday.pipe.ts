import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'weekday'})
export class WeekdayPipe implements PipeTransform {

  private weekday: Array<string>         = [null, 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  private weekdayFullname: Array<string> = [null, 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  private weekdayLetter: Array<string>   = [null, 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

  transform(value: string, format: string): string {
    let formatArray: Array<string>;
    let result = '';

    switch(format) {
        case null:
        case undefined:
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

    for (let i = 0; i < value.length; i++) {
      result += formatArray[value[i]] + ' ';
    }


    return result.slice(0, -1);
  }
}
