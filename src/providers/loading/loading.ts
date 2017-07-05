import { LoadingController, Loading } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class LoadingProvider {
  private loader: Loading;


  constructor(public loadingCtrl: LoadingController) {
    // console.log('Hello LoadingProvider Provider');
  }

  public present(dismissOnPageChange: boolean = true) {
    // console.log('loading present');
    if (!this.loader) {
      this.loader = this.loadingCtrl.create({
        content: "Carregando...",
        dismissOnPageChange: false,
      });
      this.loader.present();
    }
  }

  public dismiss() {
    if (this.loader) {
      let loader = this.loader;
      this.loader = null;
      // console.log('loading dismiss', loader);
      return loader.dismiss()
        .then(() => {
          loader = null;
        });
    }
  }

}
