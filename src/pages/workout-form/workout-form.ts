import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WorkoutProvider } from '../../providers/workout/workout';
import { LoadingProvider } from '../../providers/loading/loading';
import { UserProvider } from '../../providers/user/user';
import { SportProvider } from '../../providers/sport/sport';
import { AlertController } from 'ionic-angular';

@IonicPage({
  name: 'workoutform'
})
@Component({
  selector: 'page-workout-form',
  templateUrl: 'workout-form.html',
})
export class WorkoutFormPage {

  private user: any;
  private sports: any;
  private workout: any;
  private workoutForm: FormGroup;

  constructor(
    public _workout: WorkoutProvider,
    public _loading: LoadingProvider,
    public _user: UserProvider,
    public _sport: SportProvider,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.workoutForm = this.formBuilder.group({
      name:        ['', Validators.required],
      sport_id:    ['', Validators.required],
      schedule:    ['', Validators.required],
      active:      [true],
      created_by:  ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkoutFormPage');
  }

  ionViewWillEnter() {
    this.refreshData();
  }

  private submit() {
    console.log(this.workoutForm.value);
    this._workout
      .create(this.workoutForm.value)
      .then(workout => {
        this.confirmAction(workout);
      });
  }

  private onScheduleChange(schedule) {
    console.log('schedule', schedule);
    this.workoutForm.controls['schedule'].setValue(schedule);
  }

  private confirmAction(workout) {

    let alert = this.alertCtrl.create({
      title: 'Ficha ' + (this.workout ? 'atualizada' : 'cadastrada') + '!',
      // subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log('Agree clicked');
          this.goBack();
        }
      }]
    });
    alert.present();
  }

  private refreshData() {
    this._loading.present();

    this._sport.getSports()
      .then(sports => {
        this.sports = sports
      });

    this._user.getUserInfo()
      .then(user => {
        this.user = user
        this.workoutForm.controls['created_by'].setValue(user.id);
        this._loading.dismiss();
      });

    if (this.workout) {
      this._workout.getWorkout(this.workout.id).then(workout => {
        this.workout = workout;
        this._loading.dismiss();
      });
    }
  }

  private goBack() {
    this.navCtrl.pop();
  }

}
