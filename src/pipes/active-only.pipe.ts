import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'activeOnly'})
export class ActiveOnlyPipe implements PipeTransform {

  transform(values: Array<any>, active: boolean = true): Array<any> {
    return values ? values.filter(value => { return active ? value.active : !value.active }) : [];
  }
}
