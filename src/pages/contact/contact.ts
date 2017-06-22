import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user-provider';

@IonicPage({
  name: 'contact'
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  private user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
    console.log('ContactPage', this.user);
  }

  ionViewDidLoad() {
    console.log('DidLoad ContactPage');
  }

  ionViewWillEnter() {
    console.log('WillEnter ContactPage');
  }

}
