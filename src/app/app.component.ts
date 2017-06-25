import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserProvider } from '../providers/user/user';
import { LoginProvider } from '../providers/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;
  pages: Array<any>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _user: UserProvider,
    private _login: LoginProvider,
  ) {
    this.initializeApp();

    let user = this._user.getUserInfo().then(user => {
      console.log(user);

      this.rootPage = user ? 'home' : 'login';

      this.pages = [
        { title: 'Home', component: 'home', icon: 'home' },
        { title: 'Perfil', component: 'contact', icon: 'contact', options: { user: user } },
        { title: 'Fichas', component: 'workoutlist', icon: 'list', options: { mode: 'user' }},
        { title: 'Contatos', component: 'contactlist', icon: 'people' },
      ];

      if (!!user) {
        if (user.is_coach) {
          this.pages.push({ title: 'Gerenciar Fichas', component: 'workoutlist', icon: 'clipboard', options: { mode: 'coach' } });
        }
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.component === 'home') {
      this.nav.setRoot('home');
      // this.nav.popToRoot();
    } else {
      this.nav.push(page.component, page.options);
    }
  }

  logout() {
    this._login.logout().then(() => this.nav.setRoot('login'));
  }
}
