import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user-provider';
import { WorkoutProvider } from '../../providers/workout-provider';
import { WorkoutPage } from '../workout/workout-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private user: any;
  private workouts: any;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.user = UserProvider.getUserInfo();
    this.workouts = WorkoutProvider.getWorkoutsList();
  }

  private openWorkout(workout) {
    this.navCtrl.push(WorkoutPage, {workout: workout, type: 'view'});
  }
}
