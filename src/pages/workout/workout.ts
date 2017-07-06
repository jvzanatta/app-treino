import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content } from 'ionic-angular';
import { DatePicker } from '../../components/date-picker/date-picker';
import { WorkoutProvider } from '../../providers/workout/workout';
import { ActionSheetController } from 'ionic-angular';
import { WeekdayProvider } from '../../providers/weekday/weekday';
import { LoadingProvider } from '../../providers/loading/loading';


@IonicPage({
  name: 'workout'
})
@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
})
export class WorkoutPage {
  @ViewChild(Content) content: Content;
  @ViewChild(DatePicker) datePicker: DatePicker;

  private user;
  private workout;
  private currentDay;
  private selectedDay;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public _loading: LoadingProvider,
    public _workout: WorkoutProvider,
    public actionSheetCtrl: ActionSheetController,
  ) {
    this.user    = this.navParams.get('user');
    this.workout = this.navParams.get('workout');
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this._loading.present();
    this.refreshWorkout();
  }

  ionViewDidEnter() {
  }

  private refreshWorkout() {
    this._workout.getWorkout(this.workout.id)
      .then(workout => this.workout = workout)
      .then(() => this._loading.dismiss());
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

  private swipe(event) {
    if (event.offsetDirection == 2) {
      this.datePicker.nextWeekDay();
    } else if (event.offsetDirection == 4) {
      this.datePicker.previousWeekDay();
    }
  }

  private manage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: WeekdayProvider.getName(this.selectedDay, 'fullname'),
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Editar dia',
          icon: 'create',
          handler: () => {
            setTimeout(() => this.edit(), 200);
          }
        },{
          text: 'Limpar dia',
          cssClass: 'custom-action-destructive-button',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            setTimeout(() => this.deleteDay(), 200);
          }
        },{
          text: 'Cancelar',
          icon: 'close-circle',
          role: 'backspace',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  private edit() {
    this.navCtrl.push('exercisegroupslist', {workout: this.workout, user: this.user, selectedDay: this.selectedDay});
  }

  private clearWorkoutDay(): Promise<any> {
    return this._workout.clearWorkoutDay(this.workout, this.selectedDay)
      .then(workout => {
        this.workout = workout;
        this._loading.dismiss();
      })
      .catch(error => {
        this._loading.dismiss();
      });
  }

  private scrollToTop() {
    this.content.scrollToTop();
  }

  private deleteDay() {
    let confirm = this.alertCtrl.create({
      title: 'Deseja realmente limpar este dia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          // handler: () => {
          // }
        },
        {
          text: 'Sim, limpar!',
          handler: (teste) => {
            this._loading.present();
            this.clearWorkoutDay();

            // let navTransition = confirm.dismiss();

            // start some async method
            // this.clearWorkoutDay().then(() => {
              // once the async operation has completed
              // then run the next nav transition after the
              // first transition has finished animating out

              // navTransition.then(() => {
                // this.navCtrl.pop();
              // });
            // });
            // return false;
          }
        }
      ]
    });
    confirm.present();
  }

}
