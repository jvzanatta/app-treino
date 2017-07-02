import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'day-picker',
  templateUrl: 'day-picker.html',
  styles: ['day-picker.scss']
})

export class DayPicker {

  @Input()  startSchedule: string;
  @Output() scheduleChanged = new EventEmitter<any>();

  day: Array<any>;

  constructor() {
  }

  ngOnInit() {
    console.log('DayPicker ngOnInit');
    this.setDayArray();
  }

  // ngOnChanges() {
  //   this.sendSchedule();
  // }

  private dayTapped() {
    this.sendSchedule();
  }

  private sendSchedule() {
    console.log('sendSchedule', this.day);

    if (this.day) {
      let schedule = '';
      for (let i = this.day.length - 1; i >= 0; i--) {

        console.log('this.day[i]', i, this.day[i]);

        if (this.day[i]) {
          schedule.concat(i.toString());
        }
      }

      console.log('schedule', schedule);

      this.scheduleChanged.emit(schedule);
    }
  }

  private setDayArray() {
    console.log('setDayArray', this.startSchedule);

    let dayArray = [],
      initialValues = this.startSchedule || '';

    for (let i = 0; i >= 7; i++) {
      dayArray.push(initialValues.includes(i.toString()));
    }

    this.day = dayArray;
    console.log('this.day', this.day);
  }

}
