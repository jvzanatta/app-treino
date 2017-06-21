import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { UserProvider } from '../../providers/user-provider';
import { WorkoutProvider } from '../../providers/workout-provider';
// import { WorkoutPage } from '../workout/workout-page';

@IonicPage({
  name: 'home'
})
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
    this.workouts = WorkoutProvider.getGivenWorkouts();

    console.log(this.user, this.workouts);
  }

  private openWorkout(workout) {
    this.navCtrl.push('workout', {workout: workout, user: this.user});
  }
}
