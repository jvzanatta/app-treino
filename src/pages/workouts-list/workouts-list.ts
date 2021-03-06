import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { WorkoutProvider } from '../../providers/workout/workout';
import { LoadingProvider } from '../../providers/loading/loading';
import { ContactProvider } from '../../providers/contact/contact';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public _user: UserProvider,
    public _contact: ContactProvider,
    public _loading: LoadingProvider,
    public _workout: WorkoutProvider
  ) {
    // console.log('mode', this.navParams.get('mode'));
    this.mode  = this.navParams.get('mode');
    this.title = this.navParams.get('title');
  }

  ionViewDidLoad() {
    // console.log('DidLoad WorkoutsList');
  }

  ionViewWillEnter() {
    this.refreshData();
  }

  ionViewDidEnter() {
    // this._loading.dismiss();
    // console.log('DidEnter WorkoutsList');
  }

  private coachMode() {
    return this.mode == 'coach';
  }

  private refreshData() {
    // this._loading.present();
    this.getUserInfo();
    this.getWorkoutList();
  }

  private getUserInfo() {
    this._user.getUserInfo()
      .then(user => this.user = user);
  }

  private getWorkoutList() {
    this._loading.present();
    this._workout.getWorkoutList(this.mode)
      .then(workouts => {
        this.workouts = workouts;
        this._loading.dismiss();
      });
  }

  private edit(workout) {
    this.navCtrl.push('workoutform', {workout: workout, user: this.user});
  }

  private add() {
    this.navCtrl.push('workoutform', {user: this.user});
  }

  private open(workout) {
    this.navCtrl.push('workout', {workout: workout, user: this.user});
  }

  private share(workout) {
    // this._workout.share(workout, !workout.active)
    //   .then(result => {
    //     if (result) {
    //       this.getWorkoutList();
    //       this.showSharedToast();
    //     }
    //   });
  }

  private showPupilsList(workout) {
    this._contact.getPupils()
      .then(pupils => {
        if (pupils.length > 0) {
          let alert = this.alertCtrl.create();
          alert.setTitle('Compartilhar');
          alert.setMessage('Com quais alunos deseja compartilhar?');
          pupils.forEach(pupil => {
            // console.log(pupil, workout);
            let checked = !!workout.users.find(user => user.id == pupil.id);
            alert.addInput({
              type: 'checkbox',
              label: pupil.first_name + ' ' + pupil.last_name,
              value: pupil.id,
              checked: checked
            });
          });

          alert.addButton({
            text: 'Cancelar',
            role: 'cancel',
          });

          alert.addButton({
            text: 'OK',
            handler: pupilIds => {
              this._loading.present();
              this._workout.syncWorkoutUsers(pupilIds, workout.id)
                .then(() => this._loading.dismiss())
                .then(() => this.refreshData());
            }
          });
          alert.present();
        } else {
          this._contact.showYouHaveNoPupilsToast();
        }
      });
  }

  private archive(workout) {
    this._workout.archive(workout, !workout.active)
      .then(result => {
        if (result) {
          this.getWorkoutList();
          // this.showArchivedToast();
        }
      });
  }

  private delete(workout) {
    this._workout.promptDelete(workout)
      .then(result => {
        if (result) {
          this.getWorkoutList();
          // this.showDeletedToast();
        }
      });
  }

  private onWorkoutClick(workout) {
    switch (this.mode) {
      case 'coach':
        this.openWorkoutOptions(workout);
        break;
      case 'user':
        this.open(workout);
        break;

      default:
        // code...
        break;
    }
  }

  private openWorkoutOptions(workout) {
    // console.log('openWorkoutOptions', workout);
    let actionSheet = this.actionSheetCtrl.create({
      title: workout.name,
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Abrir',
          icon: 'open',
          handler: () => {
            // console.log('Open clicked');
            setTimeout(() => this.open(workout), 100);
          }
        },{
          text: 'Editar',
          icon: 'create',
          handler: () => {
            // console.log('Edit clicked');
            setTimeout(() => this.edit(workout), 100);
          }
        },{
          text: 'Compartilhar',
          icon: 'share',
          handler: () => {
            // console.log('Share clicked');
            setTimeout(() => this.showPupilsList(workout), 100);
          }
        },{
          text: workout.active ? 'Arquivar' : 'Desarquivar',
          icon: workout.active ? 'archive' : 'arrow-round-up',
          handler: () => {
            // console.log('Archive clicked');
            setTimeout(() => this.archive(workout), 100);
          }
        },{
          text: 'Excluir',
          icon: 'trash',
          cssClass: 'custom-action-destructive-button',
          role: 'destructive',
          handler: () => {
            // console.log('Destructive clicked');
            setTimeout(() => this.delete(workout), 100);
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

  private isCoach() {
    return !!this.user && this.user.is_coach && this.mode === 'coach';
  }

  private doRefresh(refresher) {
    // console.log('doRefresh');
    this._user.refreshData()
      .then(result => {
        if (result) {
          this.refreshData();
        }
      })
      .then(() => setTimeout(() => refresher.complete(), 100));
  }

}
