import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListWithPicture } from '../../components/list-with-picture/list-with-picture';
import { ContactProvider } from '../../providers/contact/contact';

/**
 * Generated class for the ContactListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'contactlist'
})
@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactList {

  private contacts: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _contact: ContactProvider,
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactListPage');
  }

  ionViewWillEnter() {
    this._contact.getContacts()
      .then(contacts => this.contacts = contacts);
  }

  private openContact(contact) {
    this.navCtrl.push('contact', {contact: contact, pushed: true, title: 'Perfil'});
  }

}
