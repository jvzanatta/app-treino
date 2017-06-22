import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WorkoutProvider } from '../../providers/workout-provider';
import { SportProvider } from '../../providers/sport/sport';
import { ExerciseProvider } from '../../providers/exercise/exercise';
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
  private displayingGroup;
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
    console.log('DidLoad ExerciseGroupsList');
  }

  ionViewWillEnter() {
    console.log('WillEnter ExerciseGroupsList');

    this.mapGroups();
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
    WorkoutProvider.update(this.workout);

    let confirm = this.alertCtrl.create({
      title: 'Treino salvo!',
      message: 'Deseja voltar para a página do treino?',
      buttons: [
        {
          text: 'Não, obrigado',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim, voltar!',
          handler: () => {
            console.log('Agree clicked');
            this.goBack();
          }
        }
      ]
    });
    confirm.present();
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
    console.log(this.dayExercises);
    console.log(this.workout);
  }

}
