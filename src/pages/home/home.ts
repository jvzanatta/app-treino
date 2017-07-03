import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { WorkoutProvider } from '../../providers/workout/workout';
import { LoadingProvider } from '../../providers/loading/loading';
import { Events } from 'ionic-angular';

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
  private firstRefresh: boolean;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public _loading: LoadingProvider,
    public _workout: WorkoutProvider,
    public _user: UserProvider,
  ) {
  }

  ionViewCanEnter() {
  }

  ionViewDidLoad() {
    // console.log('DidLoad HomePage');
  }

  ionViewWillEnter() {
    // console.log('**WillEnter HomePage**');
    this.refreshData();
  }

  ionViewDidEnter() {
  }

  private getData(): Promise<any> {
    return this._user.refreshData().then(result => {
      if (result) {
        this.refreshData();
      }
    });
  }

  private refreshData() {
    this.getUserInfo();
    this.getWorkoutInfo();
  }

  private getUserInfo() {
    this._user.getUserInfo()
      .then(user => {
        this.user = user;
        this.events.publish('user:logged', user, Date.now());
      });
  }

  private getWorkoutInfo() {
    this._workout.getGivenWorkouts()
      .then(workouts => {
        this.workouts = workouts;
      });
  }

  private openWorkout(workout) {
    this.navCtrl.push('workout', {workout: workout, user: this.user});
  }

  private openMyProfile() {
    this.navCtrl.push('contact', {contact: this.user, pushed: true, title: 'Meu Perfil'});
  }

  private doRefresh(refresher = null) {
    this.getData().then(() => setTimeout(() => refresher.complete(), 100));
  }

}
