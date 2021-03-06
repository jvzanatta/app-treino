import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WorkoutProvider } from '../../providers/workout/workout';
import { SportProvider } from '../../providers/sport/sport';
import { ExerciseProvider } from '../../providers/exercise/exercise';
import { LoadingProvider } from '../../providers/loading/loading';


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
  private displayingGroup;
  private selectedDay;
  private dayExercises;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public _loading: LoadingProvider,
    private _workout: WorkoutProvider,
    private _sport: SportProvider,
  ) {
    this._loading.present();

    this.user         = this.navParams.get('user');
    this.workout      = this.navParams.get('workout');
    this.selectedDay  = this.navParams.get('selectedDay');
  }

  ionViewDidLoad() {
    // console.log('DidLoad ExerciseGroupsList');
  }

  ionViewWillEnter() {
    // console.log('WillEnter ExerciseGroupsList');
    this.refreshData();
  }

  private refreshData() {
    this._sport.getSport(this.workout.sport_id)
      .then(sport => this.sport = sport)
      .then(() => this.closeAllGroups())
      .then(() => this.mapGroups())
      .then(() => this._loading.dismiss());

    this.dayExercises = this._workout.getDayExerciseKeys(this.workout, this.selectedDay);

    // console.log('sport', this.sport);
    // console.log(this.workout);
    // console.log('dayExercises', this.dayExercises);
  }

  private closeAllGroups() {
    this.displayingGroup = null;
    this.sport.groups.forEach(group => group.display = false);
  }

  private toggleGroup(group) {
    let displayed = group.display;
    this.closeAllGroups();
    if (!displayed) {
      group.display = true;
      this.displayingGroup = group;
    }
  }

  private save() {
    this._loading.present();

    this._workout.update(this.workout).then((workout) => {
      this._loading.dismiss();
      this.goBack();
    });
  }

  private appendExercise(exercise) {
    ExerciseProvider.append(exercise, this.workout, this.selectedDay);
  }

  private removeExercise(exercise) {
    ExerciseProvider.remove(exercise, this.workout, this.selectedDay);
  }

  private goBack() {
    this.navCtrl.pop();
  }

  private mapGroups() {
    this.sport.groups.forEach(group => {
      this.mapGroup(group);
    });
  }

  private mapGroup(group) {
    group.countSelected = 0;
    group.exercises.forEach(exercise => {
      if (exercise.checked = this.isChecked(exercise.id)) {
        group.countSelected++;
      }
    });
  }

  private isChecked(exerciseId) {
    // console.log(exerciseId, this.dayExercises.includes(exerciseId));
    return this.dayExercises.includes(exerciseId);
  }

  private toggleExercise(exercise) {
    if (this.isChecked(exercise.id)) {
      this.dayExercises = this.dayExercises.filter(id => id !== exercise.id);
      this.removeExercise(exercise);
    } else {
      this.dayExercises.push(exercise.id);
      this.appendExercise(exercise);
    }

    this.mapGroup(this.displayingGroup);
  }

}
