import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { WorkoutProvider } from '../../providers/workout/workout';
// import { WorkoutPage } from '../workout/workout-page';
import { LoadingController } from 'ionic-angular';



@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private user: any;
  private loader: any;
  private workouts: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
  ) {
    this.loader = this.loadingCtrl.create({
      content: "Carregando...",
      dismissOnPageChange: true,
    });
  }

  ionViewCanEnter() {
    console.log('CanEnter HomePage');
  }

  ionViewDidLoad() {
    console.log('DidLoad HomePage');
  }

  ionViewWillEnter() {
    console.log('WillEnter HomePage');
    // this.loader.present();

    this.user = UserProvider.getUserInfo();
    this.workouts = WorkoutProvider.getGivenWorkouts();
  }

  ionViewDidEnter() {
    console.log('DidEnter HomePage');
    // this.loader.dismiss();
  }

  private openWorkout(workout) {
    this.navCtrl.push('workout', {workout: workout, user: this.user});
  }

  private openMyProfile() {
    this.navCtrl.push('contact', {user: this.user});
  }

}
