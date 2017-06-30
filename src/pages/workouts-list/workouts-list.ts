import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
// import { WorkoutPage } from '../workout/workout-page';
import { UserProvider } from '../../providers/user/user';
import { WorkoutProvider } from '../../providers/workout/workout';
// import { LoadingController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';


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

  private user: any;
  private mode: string;
  private title: string;
  private workouts: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public _user: UserProvider,
    public _loading: LoadingProvider,
    public _workout: WorkoutProvider
  ) {
    console.log('mode', this.navParams.get('mode'));
    this.mode  = this.navParams.get('mode');
    this.title = this.navParams.get('title');
  }

  ionViewDidLoad() {
    console.log('DidLoad WorkoutsList');

    this._loading.present();

    this._user.getUserInfo()
      .then(user => this.user = user);

    this._workout.getWorkoutList(this.mode).then(workouts => {
      this.workouts = workouts;
      this._loading.dismiss();
    });
  }

  ionViewWillEnter() {
    console.log('WillEnter WorkoutsList');
    // this.loader.present();
  }

  ionViewDidEnter() {
    this._loading.dismiss();
    console.log('DidEnter WorkoutsList');
  }

  private openWorkout(workout) {
    this.navCtrl.push('workout', {workout: workout, user: this.user});
  }

  private add() {
    this.navCtrl.push('workoutform', {user: this.user});
  }

  private open(workout) {
    this.navCtrl.push('workout', {workout: workout, user: this.user});
  }

  // private edit(workout) {
  //   this.navCtrl.push('exercisegroupslist', {workout: workout, user: this.user, selectedDay: this.selectedDay});
  // }

  private share(workout) {

  }

  private archive(workout) {

  }

  private delete(workout) {

  }


  private onWorkoutClick(workout) {
    switch (this.mode) {
      case 'coach':
        this.openWorkoutOptions(workout);
        break;
      case 'user':
        this.openWorkout(workout);
        break;

      default:
        // code...
        break;
    }
  }

  private openWorkoutOptions(workout) {
    console.log('openWorkoutOptions', workout);
    let actionSheet = this.actionSheetCtrl.create({
      title: workout.name,
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Abrir',
          // icon: 'archive',
          handler: () => {
            console.log('Open clicked');
            this.open(workout);
          }
        // },{
        //   text: 'Editar',
        //   // icon: 'create',
        //   handler: () => {
        //     console.log('Edit clicked');
        //     this.edit(workout);
        //   }
        },{
          text: 'Compartilhar',
          // icon: 'create',
          handler: () => {
            console.log('Share clicked');
            this.share(workout);
          }
        },{
          text: workout.active ? 'Arquivar' : 'Desarquivar',
          // icon: 'archive',
          handler: () => {
            console.log('Archive clicked');
            this.archive(workout);
          }
        },{
          text: 'Excluir',
          // icon: 'trash',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.delete(workout);
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

  private isCoach() {
    return !!this.user && this.user.is_coach && this.mode === 'coach';
  }

}
