import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoadingProvider {
  private loader: any;

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }

  public present() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando...",
      dismissOnPageChange: true,
    });
    this.loader.present();
  }

  public dismiss() {
    this.loader.dismiss();
  }

}
