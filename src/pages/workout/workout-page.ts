import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '../../components/date-picker/date-picker';

/**
 * Generated class for the WorkoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage({
   name: 'workout'
 })
@Component({
  selector: 'page-workout-page',
  templateUrl: 'workout-page.html',
})
export class WorkoutPage {

  private workout;
  // private groups;
  private currentDay;
  private selectedWeekDay;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.workout = this.navParams.get('workout');
    let today = (new Date()).getDay();

    if (this.workout.schedule.indexOf(today) > -1) {
      this.selectedWeekDay = today.toString();
    } else {
      this.selectedWeekDay = this.workout.schedule.slice(0, 1);
    }
    console.log(this.workout);
    console.log(today, this.workout.schedule, this.selectedWeekDay);
  }

  // ionViewWillEnter() {
  //   this.getGroups();
  // }

  // private getGroups() {
  //   if (this.selectedWeekDay) {
  //     let groups = [];

  //     // console.log(exercises);

  //     this.workout.exercises.forEach(exercise => {
  //       if (exercise.pivot.day === this.selectedWeekDay) {
  //         let name = exercise.group.name;

  //         // console.log(name);

  //         if (!groups[name]) {
  //           groups[name] = exercise.group;
  //           groups[name].exercises = [exercise];
  //         } else {
  //           groups[name].exercises.push(exercise);
  //         }
  //       }
  //     });

  //     console.log(groups);

  //     this.groups = groups;
  //   }
  // }

}
