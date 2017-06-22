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
    console.log('DidLoad HomePage');
  }

  ionViewWillEnter() {
    console.log('WillEnter HomePage');

    this.user = UserProvider.getUserInfo();
    this.workouts = WorkoutProvider.getGivenWorkouts();
  }

  private openWorkout(workout) {
    this.navCtrl.push('workout', {workout: workout, user: this.user});
  }

  private openMyProfile() {
    this.navCtrl.push('contact', {user: this.user});
  }
}
