import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeekdayProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WeekdayProvider {

  private static weekday: Array<string>         = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  private static weekdayFullname: Array<string> = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  private static weekdayLetter: Array<string>   = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  constructor() {
    // console.log('Hello WeekdayProvider Provider');
  }

  public static getName(value: string, format: string): string {
    let formatArray = new Array<string>();

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
          // console.log('nenhum deles');
      }
    }
    // console.log(value, format, formatArray.find((day, index) => index.toString() === value));
    return formatArray.find((day, index) => index.toString() === value);
  }

  public static getList(value: string, format: string, separator: string): string {
    let formatArray = new Array<string>();

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
          // console.log('nenhum deles');
      }
    }

    return formatArray.filter((day, index) => value.includes(index.toString())).join(separator) || '';
  }

}
