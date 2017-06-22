import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {

  transform(birthday: Date|moment.Moment, args: string[]) {
    if (!birthday) return birthday;
      return moment().diff(birthday, 'years')+" anos";
  }
}
