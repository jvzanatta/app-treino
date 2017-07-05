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
    // console.log(this.workout);
  }

  ionViewDidLoad() {
    // console.log('DidLoad WorkoutPage');
    // console.log(this.workout);
  }

  ionViewWillEnter() {
    // console.log('WillEnter WorkoutPage');
    this._loading.present();
    this.refreshWorkout();
  }

  ionViewDidEnter() {
    // console.log('DidEnter WorkoutsPage');
    // this.loader.dismiss();
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

  private teste(event) {
     // console.log('swipe', event, event.direction, event.offsetDirection);
    if (event.offsetDirection == 2) {
      this.datePicker.nextWeekDay();
      // next
    } else if (event.offsetDirection == 4) {
      this.datePicker.previousWeekDay();
      // previous
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
            // console.log('Archive clicked');
            this.edit();
          }
        },{
          text: 'Limpar dia',
          cssClass: 'custom-action-destructive-button',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            // console.log('Destructive clicked');
            this.deleteDay();
          }
        },{
          text: 'Cancelar',
          icon: 'close-circle',
          role: 'backspace',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private edit() {
    // console.log('edit');
    this.navCtrl.push('exercisegroupslist', {workout: this.workout, user: this.user, selectedDay: this.selectedDay});
  }

  private clearWorkoutDay() {
    // console.log('clearWorkoutDay call', this.workout, this.workout.exercises.length);
    this._workout.clearWorkoutDay(this.workout, this.selectedDay)
      .then(workout => {
        // console.log('clearWorkoutDay return', workout, workout.exercises.length);
        this.workout = workout;
        this._loading.dismiss();
      })
      .catch(error => {
        // console.log(error);
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
          handler: () => {
          }
        },
        {
          text: 'Sim, limpar!',
          handler: () => {
            // console.log('Agree clicked');
            setTimeout(() => {
              this._loading.present();
              this.clearWorkoutDay();
            }, 100);
          }
        }
      ]
    });
    confirm.present();
  }

}
