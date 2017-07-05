import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListWithPicture } from '../../components/list-with-picture/list-with-picture';
import { ContactProvider } from '../../providers/contact/contact';
import { UserProvider } from '../../providers/user/user';
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
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Gerenciar',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Adicionar Contato',
          icon: 'create',
          handler: () => {
            // console.log('Archive clicked');
            setTimeout (() => this.showAddAlert(), 500);
          }
        },{
          text: 'Remover Contato',
          cssClass: 'custom-action-destructive-button',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            // console.log('Destructive clicked');
            setTimeout (() => this.showDeleteAlert(), 500);
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
        this.showContactAddedToast();
      }
    }, error => {
      // console.log('error', error);
      if (error.statusText == 'Not Found') {
        this.showContactNotFoundToast();
      } else if (error.statusText == '') {

      }
    });
  }

  private showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

  private showDeleteAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Quem deseja remover da lista de contatos?');

    this.contacts.forEach(contact => {
      alert.addInput({
        type: 'radio',
        label: contact.first_name + ' ' + contact.last_name,
        value: contact.id,
        checked: false
      });
    });

    alert.addButton({
      text: 'Cancelar',
      role: 'cancel',
    });

    alert.addButton({
      text: 'Excluir',
      handler: id => {
        // console.log(id);
        this.deleteContact(id);
      }
    });

    alert.present();
  }

  private deleteContact(id: number) {
    this._contact.removePupil(id).then(result => {
      if (result) {
        this.getContacts();
        this.showContactRemovedToast();
      }
    }, error => this.showContactRemoveErrorToast());
  }

  private manage(contact) {
    // console.log('press', contact);
  }

  private openContact(contact) {
    this.navCtrl.push('contact', {contact: contact, pushed: true, title: 'Perfil'});
  }

  private showContactRemovedToast() {
    this.showToast('Contato removido com sucesso!');
  }

  private showContactAddedToast() {
    this.showToast('Contato adicionado com sucesso!');
  }

  private showContactNotFoundToast() {
    this.showToast('Não encontramos um contato com o e-mail digitado.');
  }

  private showContactRemoveErrorToast() {
    this.showToast('Não foi possível remover o contato selecionado.');
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
