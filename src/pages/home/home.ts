import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { WorkoutProvider } from '../../providers/workout/workout';
import { LoadingProvider } from '../../providers/loading/loading';
// import { LoadingController } from 'ionic-angular';


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

  constructor(
    public navCtrl: NavController,
    public _loading: LoadingProvider,
    public _workout: WorkoutProvider,
    public _user: UserProvider,
  ) {

  }

  ionViewCanEnter() {
    console.log('CanEnter HomePage');
  }

  ionViewDidLoad() {
    console.log('DidLoad HomePage');
  }

  ionViewWillEnter() {
    console.log('WillEnter HomePage');
    // this._loading.present(true);

    this._user.getUserInfo()
      .then(user => {
        this.user = user;
        UserProvider.userData.next(user);
      });

    this._workout.getGivenWorkouts()
      .then(workouts => {
        this.workouts = workouts;
      });
  }

  ionViewDidEnter() {
    console.log('DidEnter HomePage');
    // setTimeout(() => this._loading.dismiss(), 500);
  }

  private openWorkout(workout) {
    this.navCtrl.push('workout', {workout: workout, user: this.user});
  }

  private openMyProfile() {
    this.navCtrl.push('contact', {contact: this.user, pushed: true, title: 'Meu Perfil'});
  }


}
