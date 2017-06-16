import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.html'
})

export class DatePicker {

  @Input()  weekdays: string;
  @Output() weekdayChanged = new EventEmitter<any>();

  selectedWeekDay: string;

  constructor() {

  }

  ngOnChanges() {
    this.executeClickWeekDay(1);
  }

  // ngOnInit() {
  //   console.log('ngOnInit', this.weekdays);
  // }

  private previousWeekDay() {
    this.executeClickWeekDay(-1);
  }

  private nextWeekDay() {
    this.executeClickWeekDay(1);
  }

  private executeClickWeekDay(value) {
    let pos = this.weekdays.indexOf(this.selectedWeekDay) + value,
      backupValue = value > 0 ? this.weekdays.slice(0, 1) : this.weekdays.slice(-1);

    this.selectedWeekDay = this.weekdays.slice(pos, pos+1) || backupValue;

    console.log(this.selectedWeekDay);

    this.weekdayChanged.emit(this.selectedWeekDay);
  }

}
