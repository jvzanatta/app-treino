import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { UserProvider } from '../providers/user/user';
import { AuthProvider } from '../providers/auth/auth';


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
    private _auth: AuthProvider,
    public events: Events,
  ) {
    this.initializeApp();

    let user = this._user.getUserInfo().then(user => {
      if (!user) {
        this.logout();
      } else {
        this.updateData();
      }
    });

    this.events.subscribe('user:logged', (user, time) => {
      this.checkUser(user);
    });

    this.events.subscribe('user:forceLogout', (time) => {
      this.logout();
      // console.log('user:forceLogout', 'at', time);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(() => this.splashScreen.hide(), 2000);
    });
  }

  private updateData(): Promise<any> {
    return this._user.refreshData().then(result => {
      if (result) {
        this.rootPage = 'home';
      } else {
        this.logout();
      }
    }, error => this.logout());
  }

  private definePagesArray(user) {
    this.pages = [
      {
        title: 'Início',
        visible: true,
        component: 'home',
        icon: 'home'
      },
      {
        title: 'Perfil',
        visible: true,
        component: 'contact',
        icon: 'contact',
        options: {
          title: 'Meu Perfil'
        }
      },
      {
        title: 'Contatos',
        visible: true,
        component: 'contactlist',
        icon: 'people'
      },
      {
        title: 'Fichas',
        visible: true,
        component: 'workoutlist',
        icon: 'list',
        options: {
          mode: 'user',
          title: 'Fichas'
        }
      },
      {
        title: 'Gerenciar Fichas',
        visible: (user && user.is_coach),
        component: 'workoutlist',
        icon: 'clipboard',
        options: {
          mode: 'coach',
          title: 'Gerenciar Fichas'
        }
      },
      {
        title: 'Sobre',
        visible: true,
        component: 'about',
        icon: 'information-circle',
      }
    ];
  }

  private openPage(page) {
    this.nav.setRoot(page.component, page.options);
  }

  private logout() {
    this._auth.logout().then(() => this.nav.setRoot('login'));
  }

  private checkUser(user) {
    this.definePagesArray(user);
  }
}
