import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.html',
  styles: ['date-picker.scss']
})

export class DatePicker {

  @Input()  weekdays: string;
  @Output() weekdayChanged = new EventEmitter<any>();

  selectedWeekday: string;

  constructor() {}

  ngOnInit() {
    this.today();
  }

  private today() {
    let today: string = (new Date()).getDay().toString();

    // console.log('this.weekDays (schedule)', this.weekdays);
    if (this.weekdays.includes(today)) {
      this.selectedWeekday = today;
    } else {
      this.selectedWeekday = this.weekdays.slice(0, 1);
    }

    this.sendDay();
  }

  private sendDay() {
    this.weekdayChanged.emit(this.selectedWeekday);
  }

  public previousWeekDay() {
    // console.log('previousWeekDay');
    this.executeClickWeekDay(-1);
  }

  public nextWeekDay() {
    // console.log('nextWeekDay');
    this.executeClickWeekDay(1);
  }

  private executeClickWeekDay(value) {
    // console.log(this.weekdays);
    if (this.weekdays) {
      let pos = this.weekdays.indexOf(this.selectedWeekday) + value,
        backupValue = value > 0 ? this.weekdays.slice(0, 1) : this.weekdays.slice(-1);

      this.selectedWeekday = this.weekdays.slice(pos, pos+1) || backupValue;

      this.sendDay();
    }
  }

}
