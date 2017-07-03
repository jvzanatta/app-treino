import { LoadingController, Loading } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class LoadingProvider {
  private loader: Loading;

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }

  public present(dismissOnPageChange: boolean = true) {
    console.log('loading present');
    if (this.loader) {
      this.dismiss().then(() => {
        this.showLoader(dismissOnPageChange);
      });
    } else {
      this.showLoader(dismissOnPageChange);
    }
  }

  private showLoader(dismissOnPageChange) {
    this.loader = this.loadingCtrl.create({
      content: "Carregando...",
      dismissOnPageChange: dismissOnPageChange,
    });
    this.loader.present();
  }

  public dismiss(): Promise<any> {
    if (this.loader) {
      console.log('loading dismiss', this.loader);
      return this.loader.dismiss()
        .then(teste => {
          console.log('teste dismiss', teste);
          this.loader = null;
        });
    } else {
      return new Promise((resolve) => setTimeout(() => resolve(true), 50));
    }
  }

}
