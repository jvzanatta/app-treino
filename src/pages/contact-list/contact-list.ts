import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListWithPicture } from '../../components/list-with-picture/list-with-picture';
import { ContactProvider } from '../../providers/contact/contact';
import { UserProvider } from '../../providers/user/user';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


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
    public navParams: NavParams,
    public _contact: ContactProvider,
    public _user: UserProvider,
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactListPage');
  }

  ionViewWillEnter() {
    this._contact.getContacts()
      .then(contacts => this.contacts = contacts);

    this._user.getUserInfo()
      .then(user => this.user = user);
  }

  private isCoach() {
    return this.user && this.user.is_coach;
  }

  private options() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Gerenciar',
      enableBackdropDismiss: true,
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Adicionar Contato',
          // cssClass: 'custom-action-button',
          // icon: 'create',
          handler: () => {
            console.log('Archive clicked');
            setTimeout (() => this.addContact(), 500);
          }
        },{
          text: 'Remover Contato',
          cssClass: 'custom-action-destructive-button custom-action-button',
          // icon: 'trash',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            setTimeout (() => this.deleteContact(), 500);
          }
        },{
          text: 'Cancelar',
          cssClass: 'custom-action-button',
          role: 'backspace',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private addContact() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      message: "Digite o e-mail do cliente que deseja adicionar",
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
          handler: data => {
            console.log(data);
          }
        }
      ]
    });

    alert.present();
  }

  private deleteContact() {
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
      handler: data => {
        console.log(data);
      }
    });

    alert.present();
  }

  private openContact(contact) {
    this.navCtrl.push('contact', {contact: contact, pushed: true, title: 'Perfil'});
  }


}
