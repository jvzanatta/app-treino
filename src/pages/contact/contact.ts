import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

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
    public _user: UserProvider,
  ) {
    this.title   = this.navParams.get('title');
    this.pushed  = this.navParams.get('pushed');
    this.contact = this.navParams.get('contact');
    console.log('ContactPage', this.user);
  }

  ionViewDidLoad() {
    console.log('DidLoad ContactPage');
  }

  ionViewWillEnter() {
    console.log('WillEnter ContactPage');

    this._user.getUserInfo()
      .then(user => {
        this.user = user;
      });
  }

  private isCoach() {
    return !!this.user && this.user.is_coach;
  }

}
