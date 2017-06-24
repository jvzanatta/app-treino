import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpHandler } from '../http/http';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  constructor(
    private http: HttpHandler,
    private storage: Storage,
  ) {
    console.log('Hello UserProvider Provider');
  }

  public getUserInfo(): Promise<any> {
    return this.storage.get('user');
  }


  public getAuthInfo(): Promise<any> {
    return this.storage.get('auth');
  }

}
