import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Pipe({
  name: 'chatTimestamp',
})
export class ChatTimestampPipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe
  ){}

  transform(timestamp: string) {
    let date = (new Date(timestamp)).toDateString();
    console.log(date, (new Date).toDateString());
    if ((new Date).toDateString() != date) {
      return this.datePipe.transform(timestamp, 'dd/MM/yyyy hh:mm');
    }
    return timestamp.slice(11, 16);
  }
}
