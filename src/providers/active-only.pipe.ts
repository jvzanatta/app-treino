import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'activeOnly'})
export class ActiveOnlyPipe implements PipeTransform {

  transform(values: Array<any>): Array<any> {
    return values.filter(value => { return value.active });
  }
}
