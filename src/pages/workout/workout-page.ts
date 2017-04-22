import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WorkoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-workout-page',
  templateUrl: 'workout-page.html',
})
export class WorkoutPage {

  private workout;
  private
  private currentDay;
  private selectedWeekDay;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.workout = this.navParams.get('workout');
    console.log(this.workout);
  }

  ionViewDidLoad() {
    this.selectedWeekDay = this.workout.schedule.slice(0, 1);

  }

  private setExercisesList() {
    if (this.selectedWeekDay) {

    }
  }

  private previousWeekDay() {
    this.executeClickWeekDay(-1);
  }

  private executeClickWeekDay(value) {
    let pos = this.workout.schedule.indexOf(this.selectedWeekDay) + value,
      backupValue = value > 0 ? this.workout.schedule.slice(0, 1) : this.workout.schedule.slice(-1);

    this.selectedWeekDay = this.workout.schedule.slice(pos, pos+1) || backupValue;

    this.setExercisesList();
  }

  private nextWeekDay() {
    this.executeClickWeekDay(1);
  }


}
