import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ActionSheetController } from 'ionic-angular';
import { ContactProvider } from '../../providers/contact/contact';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage({
  name: 'contact'
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  private user: any;
  private title: string;
  private pushed: boolean;
  private contact: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public _user: UserProvider,
    public _contact: ContactProvider,
    public _loading: LoadingProvider,
  ) {
    this.title   = this.navParams.get('title');
    this.pushed  = this.navParams.get('pushed');
    this.contact = this.navParams.get('contact');

    // console.log('ContactPage', this.user);
  }

  ionViewDidLoad() {
    // console.log('DidLoad ContactPage');
  }

  ionViewWillEnter() {
    // console.log('WillEnter ContactPage');

    this._user.getUserInfo()
      .then(user => {
        this.user = user;
        console.log(this.user);
        if (!this.contact) {
          this.contact = this.user;
        }
      });
  }

  private edit(user: any) {

  }

  private sendToPhoneContacts(contact) {
    this._loading.present();
    this._contact.sendToPhoneContacts(contact).then(() => this._loading.dismiss());
  }


  private manage() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Gerenciar',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Editar',
          icon: 'create',
          handler: () => {
            // console.log('Edit clicked');
            this.edit(this.user);
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
    return !!this.user && this.user.is_coach;
  }

  private isOwnProfile() {
    return this.user && this.contact && this.user.id === this.contact.id;
  }

}
