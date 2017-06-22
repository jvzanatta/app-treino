import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { WorkoutPage } from '../workout/workout-page';
import { UserProvider } from '../../providers/user-provider';
import { WorkoutProvider } from '../../providers/workout-provider';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController
  ) {
    console.log('mode', this.navParams.get('mode'));
  }

  ionViewDidLoad() {
    console.log('DidLoad WorkoutsList');
    this.workouts = WorkoutProvider.getGivenWorkouts();
  }

  ionViewWillEnter() {
    console.log('WillEnter WorkoutsList');
  }

  private openWorkout(workout) {
    // this.navCtrl.push(WorkoutPage, {workout: workout, type: 'edit'});
  }

  private openWorkoutOptions(workout) {
    console.log('openWorkoutOptions', workout);
    let actionSheet = this.actionSheetCtrl.create({
      title: workout.name,
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Excluir',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: workout.active ? 'Arquivar' : 'Desarquivar',
          icon: 'archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Editar',
          icon: 'create',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancelar',
          role: 'backspace',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
