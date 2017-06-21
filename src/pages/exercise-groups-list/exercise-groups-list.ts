import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WorkoutProvider } from '../../providers/workout-provider';
import { SportProvider } from '../../providers/sport/sport';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the ExerciseGroupsList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage({
   name: 'exercisegroupslist'
 })
@Component({
  selector: 'page-exercise-groups-list',
  templateUrl: 'exercise-groups-list.html',
})
export class ExerciseGroupsList {

  private user;
  private workout;
  private sport;
  private selectedDay;
  private dayExercises;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
    this.user         = this.navParams.get('user');
    this.workout      = this.navParams.get('workout');
    this.selectedDay  = this.navParams.get('selectedDay');
    this.sport        = SportProvider.getSport(this.workout.sport_id);
    this.dayExercises = WorkoutProvider.getDayExerciseKeys(this.workout, this.selectedDay);

    this.closeAllGroups()

    console.log(this.sport);
    // console.log(this.workout);
    console.log(this.dayExercises);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExerciseGroupsList');

    this.mapExercises();
  }

  private closeAllGroups() {
    this.sport.groups.forEach(group => group.display = false);
  }

  private toggleGroup(group) {
    let displayed = group.display;
    this.closeAllGroups();
    if (!displayed) {
      group.display = true;
    }
  }

  private mapExercises() {
    this.sport.groups.forEach(group => {
      group.exercises.forEach(exercise => {
        exercise.checked = this.isChecked(exercise.id);
      });
    });
  }

  private isChecked(exerciseId) {
    // console.log(exerciseId, this.dayExercises.includes(exerciseId));
    return this.dayExercises.includes(exerciseId);
  }

  private selectExercise(exercise) {
    // console.log('selectExercise()', exercise, this.isChecked(exercise.id), this.dayExercises);
    if (this.isChecked(exercise.id)) {
      // exercise.checked = false;
      this.dayExercises = this.dayExercises.filter(id => id !== exercise.id);
    } else {
      // exercise.checked = true;
      this.dayExercises.push(exercise.id);
    }
    // console.log('fim selectExercise()', this.isChecked(exercise.id), this.dayExercises);
    console.log(this.dayExercises);
  }

}
