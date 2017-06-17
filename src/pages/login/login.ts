import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginProvider } from '../../providers/login-provider';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup; // our model driven form

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginProvider: LoginProvider
  ) {
  }

  ngOnInit() {
    localStorage.clear();

    this.loginForm = new FormGroup({
        email: new FormControl('joaovictor15@gmail.com', [<any>Validators.required, <any>Validators.minLength(5)]),
        password: new FormControl('321654', [<any>Validators.required, <any>Validators.minLength(5)])
    });
  }

  ionViewDidLoad() {

  }

  private login() {
    this.loginProvider.login(this.loginForm.value).subscribe(data => {
      this.navCtrl.setRoot(HomePage);
    });
  }

}
