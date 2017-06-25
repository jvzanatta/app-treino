import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

// import { HttpHandler } from '../http/http';
import { UserProvider } from '../user/user';
import { EnvironmentConfig } from '../environment.config';



/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  private endpoint = 'login';
  private API_URL: string = EnvironmentConfig.API_URL;

  constructor(
    private http:    Http,
    private storage: Storage,
  ) { }

  public login(values: any): Observable<any> {
    let data = {
      email: values.email,
      password: values.password
    };

    return this.http.post(this.API_URL + this.endpoint, data)
      .map(res => this.storeData(res.json().data));
  }

  public logout(): Promise<null> {
    return this.storage.clear();
  }

  public storeData(data) {
    console.log('data', data);
    localStorage.setItem('auth', data.auth);
    this.storage.set('user', data.user);
    this.storage.set('pupils', data.pupils);
    this.storage.set('coaches', data.coaches);
    this.storage.set('workouts', data.workouts);
    this.storage.set('givenWorkouts', data.givenWorkouts);
    this.storage.set('createdWorkouts', data.createdWorkouts);
    this.storage.set('sports', data.sports);

    return data;
  }

}
