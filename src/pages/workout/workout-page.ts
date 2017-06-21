import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatePicker } from '../../components/date-picker/date-picker';
import { WorkoutProvider } from '../../providers/workout-provider';
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

  private user;
  private workout;
  private currentDay;
  private selectedDay;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    // public workoutProvider: WorkoutProvider
  ) {
    this.user    = this.navParams.get('user');
    this.workout = this.navParams.get('workout');

    console.log(this.workout);
  }

  public changeDay(day) {
    this.selectedDay = day;
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
    console.log('delete');
    let confirm = this.alertCtrl.create({
      title: 'Deseja realmente limpar este dia?',
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim, limpar!',
          handler: () => {
            console.log('Agree clicked');
            let loader = this.loadingCtrl.create({
              content: "Carregando...",
              dismissOnPageChange: true,
              // duration: 3000
            });
            console.log(loader);
            loader.present();

            this.workout = WorkoutProvider.clearWorkoutDay(this.workout.id, this.selectedDay);
            setTimeout(() => {
              loader.dismiss();
            }, 1000);
            // loader.dismiss();
            // console.log(this.workout);

          }
        }
      ]
    });
    confirm.present();
  }

}
