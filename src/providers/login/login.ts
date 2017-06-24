import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Storage } from '@ionic/storage';
// import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { HttpHandler } from '../http/http';
import { UserProvider } from '../user/user';


/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  // private storage: Storage;
  private endpoint = 'login';

  constructor(
    // public http: Http,
    private http: HttpHandler,
    private storage: Storage,
  ) {

  }

  public login(values: any): Observable<any> {
    let data = {
      email: values.email,
      password: values.password
    };

    return this.http.post(this.endpoint, data).map(res => this.storeData(res));
  }

  public logout(): Promise<null> {
    return this.storage.clear();
  }

  private storeData(res) {
    this.storage.set('user', JSON.stringify(res.user));
    this.storage.set('auth', res.auth);
    this.storage.set('pupils', JSON.stringify(res.pupils));
    this.storage.set('coaches', JSON.stringify(res.coaches));
    this.storage.set('workouts', JSON.stringify(res.workouts));
    this.storage.set('givenWorkouts', JSON.stringify(res.givenWorkouts));
    this.storage.set('createdWorkouts', JSON.stringify(res.createdWorkouts));
    this.storage.set('sports', JSON.stringify(res.sports));
  }

}
