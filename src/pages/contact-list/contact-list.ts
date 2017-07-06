import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListWithPicture } from '../../components/list-with-picture/list-with-picture';
import { ContactProvider } from '../../providers/contact/contact';
import { UserProvider } from '../../providers/user/user';
import { WorkoutProvider } from '../../providers/workout/workout';
import { LoadingProvider } from '../../providers/loading/loading';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage({
  name: 'contactlist'
})
@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactList {

  private user: any;
  private contacts: any;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public _contact: ContactProvider,
    public _user: UserProvider,
    public _workout: WorkoutProvider,
    public _loading: LoadingProvider,

  ) {

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ContactListPage');
  }

  ionViewWillEnter() {
    this.refreshData();
  }

  private refreshData() {
    this.getContacts();
    this._user.getUserInfo()
      .then(user => this.user = user);
  }

  private getContacts() {
    this._contact.getContacts()
      .then(contacts => this.contacts = contacts);
  }

  private isCoach() {
    return this.user && this.user.is_coach;
  }

  private options() {
    setTimeout (() => this.showAddAlert(), 200);
  }

  private manage(contact) {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Gerenciar Fichas',
          icon: 'share',
          handler: () => {
            // console.log('Archive clicked');
            setTimeout (() => this.showWorkoutList(contact.id), 200);
          }
        },{
          text: 'Remover Contato',
          cssClass: 'custom-action-destructive-button',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            // console.log('Destructive clicked');
            setTimeout (() => this.deleteContact(contact.id), 200);
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

  private showAddAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      message: 'Digite o e-mail do cliente que deseja adicionar',
      inputs: [
        {
          name: 'email',
          placeholder: 'E-mail aqui'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: email => {
            // console.log(email);
            this.addContact(email);
          }
        }
      ]
    });

    alert.present();
  }

  private addContact(email: any) {
    this._contact.addPupil(email).then(result => {
      if (result) {
        this.getContacts();
      }
    });
  }

  private showWorkoutList(contactId: number) {
    this._workout.getCreatedWorkouts()
      .then(workouts => {
        let alert = this.alertCtrl.create();
        alert.setTitle('Qual treino deseja compartilhar?');
        workouts.forEach(workout => {
          let checked = !!workout.users.find(user => user.id == contactId);
          alert.addInput({
            type: 'checkbox',
            label: workout.name,
            value: workout.id,
            checked: checked
          });
        });

        alert.addButton({
          text: 'Cancelar',
          role: 'cancel',
        });

        alert.addButton({
          text: 'OK',
          handler: workoutIds => {
            this._loading.present();
            this._workout.syncPupilWorkouts(workoutIds, contactId)
              .then(() => this._loading.dismiss());
          }
        });
        alert.present();
      });
  }

  private confirmDelete(): Promise<any> {
    return new Promise ((resolve, reject) => {
      let confirm = this.alertCtrl.create({
        title: 'Remover',
        message: 'Tem certeza que deseja remover o contato?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              reject(false);
            }
          },
          {
            text: 'Sim, excluir!',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      confirm.present();
    });
  }

  private deleteContact(id: number) {
    this.confirmDelete()
      .then(result => this._contact.removePupil(id))
      .then(result => this.getContacts());
  }

  private open(contact) {
    this.navCtrl.push('contact', {contact: contact, pushed: true, title: 'Perfil'});
  }

  private doRefresh(refresher) {
    this._user.refreshData()
      .then(result => {
        if (result) {
          this.refreshData();
        }
      })
      .then(() => setTimeout(() => refresher.complete(), 100));
  }

}
