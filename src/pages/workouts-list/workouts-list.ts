import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user-provider';
import { WorkoutProvider } from '../../providers/workout-provider';
import { WorkoutPage } from '../workout/workout-page';

/**
 * Generated class for the WorkoutsList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage({
   name: 'workoutlist'
 })
@Component({
  selector: 'page-workouts-list',
  templateUrl: 'workouts-list.html',
})
export class WorkoutsList {

  private workouts: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkoutsList');
    this.workouts = WorkoutProvider.getGivenWorkouts();
  }

  private openWorkout(workout) {
    this.navCtrl.push(WorkoutPage, {workout: workout, type: 'edit'});
  }

}
