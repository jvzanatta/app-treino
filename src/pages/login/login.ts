import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';
import { LoadingProvider } from '../../providers/loading/loading';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public isLogin: boolean;
  public form: FormGroup;
  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public _loading: LoadingProvider,
    private _auth: AuthProvider,
  ) {
  }

  ngOnInit() {
    this.isLogin = true;
    this.loginForm = new FormGroup({
        email: new FormControl('joaovictor15@gmail.com', [Validators.required, Validators.minLength(5)]),
        password: new FormControl('321654', [Validators.required, Validators.minLength(5)]),
        fbId: new FormControl(''),
    });
    this.registerForm = new FormGroup({
        first_name: new FormControl('João Victor', [Validators.required, Validators.minLength(1)]),
        last_name: new FormControl('Zanatta', [Validators.required, Validators.minLength(1)]),
        email: new FormControl('joaovictor15@gmail.com', [Validators.required, Validators.minLength(5)]),
        password: new FormControl('321654', [Validators.required, Validators.minLength(5)]),
        // weight: new FormControl('76.2', [Validators.required, Validators.minLength(1)]),
        // height: new FormControl('1.79', [Validators.required, Validators.minLength(1)]),
    });
  }

  ionViewDidLoad() {

  }

  private send() {
    return this.isLogin ? this.login() : this.register();
  }

  private login() {
    this._loading.present();

    this._auth.login(this.loginForm.value).subscribe(
      loginData => {
        this._loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }, error => {
        this._loading.dismiss();
        // console.log(error.json());
      });
  }

  private register() {
    this._loading.present();

    this._auth.register(this.registerForm.value).subscribe(
      loginData => {
        this._loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }, error => {
        this._loading.dismiss();

        // console.log(error.json());

        let alert = this.alertCtrl.create({
          title: 'Falha ao registrar!',
          subTitle: this.getErrorMessage(error.json()),
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

  private toggleLogin() {
    this.isLogin = !this.isLogin;
  }

  private getForm(): FormGroup {
    return this.isLogin ? this.loginForm : this.registerForm;
  }

  private registerUsingFacebook() {
    this._auth.registerUsingFacebook().then((teste) => console.log(teste));
  }

  private getErrorMessage(error): string {
    if (!!error.email) {
      for (var i = error.email.length - 1; i >= 0; i--) {
        if (error.email[i].includes('valid email')) {
          return 'Por favor digite um e-mail válido.';
        } else {
          return 'E-mail já existe!';
        }
      }
    } else {

    }
  }

}
