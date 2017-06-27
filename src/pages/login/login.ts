import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';
import { LoadingProvider } from '../../providers/loading/loading';
import { UserProvider } from '../../providers/user/user';

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
    public _loading: LoadingProvider,
    private _login: AuthProvider,
  ) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
        email: new FormControl('joaovictor15@gmail.com', [Validators.required, Validators.minLength(5)]),
        password: new FormControl('321654', [Validators.required, Validators.minLength(5)]),
        fbId: new FormControl(''),
    });
  }

  ionViewDidLoad() {

  }

  private login() {
    this._loading.present(true);

    this._login.login(this.loginForm.value).subscribe((loginData) => {
      // this._loading.dismiss();
      // console.log('login subscribe', loginData.user);
      // UserProvider.userData.next(loginData.user);
      this.navCtrl.setRoot(HomePage);
    });
  }

  private register() {

  }

  private registerUsingFacebook() {
    this._login.registerUsingFacebook().then((teste) => console.log(teste));
  }

}
