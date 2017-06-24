import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content } from 'ionic-angular';
import { DatePicker } from '../../components/date-picker/date-picker';
import { WorkoutProvider } from '../../providers/workout/workout';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the WorkoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'workout'
})
@Component({
  selector: 'page-workout-page',
  templateUrl: 'workout-page.html',
})
export class WorkoutPage {
  @ViewChild(Content) content: Content;

  private user;
  private workout;
  private loader: any;
  private currentDay;
  private selectedDay;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
    this.user    = this.navParams.get('user');
    this.workout = this.navParams.get('workout');
    this.loader = this.loadingCtrl.create({
      content: "Carregando...",
      dismissOnPageChange: true,
    });
    console.log(this.workout);
  }

  ionViewDidLoad() {
    console.log('DidLoad WorkoutPage');
  }

  ionViewWillEnter() {
    console.log('WillEnter WorkoutPage');
    // this.loader.present();
    this.workout = WorkoutProvider.getWorkout(this.workout.id);
  }

  ionViewDidEnter() {
    console.log('DidEnter WorkoutsList');
    // this.loader.dismiss();
  }

  public changeDay(day) {
    this.selectedDay = day;
    this.scrollToTop();
  }

  public isOwner() {
    if (!this.user || !this.workout) {
      return false;
    }
    return this.user.id === this.workout.created_by;
  }

  private edit() {
    console.log('edit');
    this.navCtrl.push('exercisegroupslist', {workout: this.workout, user: this.user, selectedDay: this.selectedDay});
  }

  private delete() {
    let confirm = this.alertCtrl.create({
      title: 'Deseja realmente limpar este dia?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { console.log('Disagree clicked');}
        },
        {
          text: 'Sim, limpar!',
          handler: () => {
            console.log('Agree clicked');
            this.clearWorkoutDay();
          }
        }
      ]
    });
    confirm.present();
  }

  private clearWorkoutDay() {
    let loader = this.loadingCtrl.create({
      content: "Carregando...",
      dismissOnPageChange: true,
    });

    loader.present();

    this.workout = WorkoutProvider.clearWorkoutDay(this.workout.id, this.selectedDay);

    setTimeout(() => {
      loader.dismiss();
    }, 50);
  }

  private scrollToTop() {
    this.content.scrollToTop();
  }

}
