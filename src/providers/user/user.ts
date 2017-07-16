import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastController } from 'ionic-angular';
import { HttpHandler } from '../http/http';
import { Storage } from '@ionic/storage';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class UserProvider {

  private endpoint = 'users/';
  public static userData: Subject<any> = new Subject();

  constructor(
    public alertCtrl: AlertController,
    public _loading: LoadingProvider,
    public toastCtrl: ToastController,
    private http:    HttpHandler,
    private storage: Storage,
  ) {
    // console.log('Hello UserProvider Provider');
  }

  public getUserInfo(): Promise<any> {
    return this.storage.get('user');
  }

  public refreshData(): Promise<any> {
    return this.http.get('users/data').toPromise()
      .then(data => this.storeData(data))
      .then(result => Promise.resolve(result));
  }

  private storeData(data): Promise<any> {
    return this.storage.set('user', data.user)
      .then(() => this.storage.set('pupils', data.pupils))
      .then(() => this.storage.set('coaches', data.coaches))
      .then(() => this.storage.set('workouts', data.workouts))
      .then(() => this.storage.set('givenWorkouts', data.givenWorkouts))
      .then(() => this.storage.set('createdWorkouts', data.createdWorkouts))
      .then(() => this.storage.set('sports', data.sports));
  }

  public update(user): Promise<any> {
    this._loading.present();
    return this.patch(user) // .then(user => {console.log(user); return user;})
      .then((updatedUser) => this.updateLocaly(updatedUser))
      .then((updatedUser) => {
        // console.log('result', user);
        this._loading.dismiss();
        this.showUpdatedUserToast();
        return updatedUser;
      });
  }

  public updateLocaly(updatedUser): Promise<any> {
    return this.storage.set('user', updatedUser);
  }

  private patch(user): Promise<any> {
    return this.http.patch(this.endpoint + user.id, user).toPromise();
  }


  //
  //
  // ALERTAS
  //
  //

  public showCoachModeChangedAlert(handler) {
    this.showAlert(
      null,
      'Você mudou o modo de utilização do aplicativo. Por favor, logue novamente para que as alterações tenham efeito.',
      handler
    );
  }

  private showAlert(title: string, msg: string, okHander = null, cancelHandler = null) {
    let alert = this.alertCtrl.create();

    if (title) {
      alert.setTitle(title);
    }

    if (msg) {
      alert.setMessage(msg);
    }

    if (okHander) {
      if (cancelHandler) {
        alert.addButton({
          text: 'Cancelar',
          handler: cancelHandler
        });
      } else {
        alert.addButton('Cancelar');
      }

      alert.addButton({
        text: 'OK',
        handler: okHander
      });
    } else {
      alert.addButton('OK');
    }


    alert.present();
  }


  //
  //
  // TOASTS
  //
  //

  private showUpdatedUserToast() {
    this.showToast('Dados de cadastro atualizados!');
  }

  private showToast(msg: string) {
    setTimeout(() => {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 2500
      });
      toast.present();
    }, 100);
  }

}
