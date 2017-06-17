import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserProvider } from '../providers/user-provider';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ; // = 'login';
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: 'home' },
      { title: 'Meus Treinos', component: 'workoutlist' },
      { title: 'Gerenciar Alunos', component: 'contactlist' },
      { title: 'Gerenciar Treinos', component: 'workoutlist' },
      { title: 'Perfil', component: 'contact' },
      { title: 'Sair', component: 'login' }
    ];

    // console.log('UserProvider.getUserInfo()', !!UserProvider.getUserInfo());
    this.rootPage = (UserProvider.getUserInfo() ? 'home' : 'login');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // console.log('UserProvider.getUserInfo()', !!UserProvider.getUserInfo());
      // UserProvider.getUserInfo() ? this.openPage(this.pages[0]) : '';
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
