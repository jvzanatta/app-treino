import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
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
export class AuthProvider {

  private endpoint = 'login';
  private oauthTokenKey = 'fbTokenKey'
  private API_URL: string = EnvironmentConfig.API_URL;
  private facebookPermissions = ['user_birthday', 'public_profile', 'user_friends', 'email'];

  constructor(
    private fb: Facebook,
    private http:    Http,
    private storage: Storage,
  ) { }

  public register(values: any) {
    return this.http.post(this.API_URL + 'register', values)
      .map(res => this.storeData(res.json().data));
  }

  public login(values: any): Observable<any> {
    return this.http.post(this.API_URL + this.endpoint, values)
      .map(res => this.storeData(res.json().data));
  }

  public logout(): Promise<null> {
    localStorage.clear();
    return this.storage.clear();
  }

  public storeData(data) {
    // console.log('data', data);
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

  public registerUsingFacebook(): Promise<any> {
    console.log('registerUsingFacebook');

    let promise = new Promise ((resolve, reject) => {
      this.fb.login(this.facebookPermissions)
        .then((res: FacebookLoginResponse) => {
          console.log('Logged into Facebook!', res, res.authResponse.userID);

          this.fb.api('me', this.facebookPermissions)
            .then(
              res => {
              console.log(res.authResponse.userID, res);
              })
            .catch(e => console.log('Error getting Facebook data', e));
        })
        .catch(e => console.log('Error logging into Facebook', e, e.error()));
    });

    return promise;
    // return this.fb.login(['public_profile', 'user_friends', 'email'])
    //   .then(accessToken => {
    //     if (!accessToken) {
    //       return Promise.reject('No access token found');
    //     }

    //     console.log('Logged into Facebook!', accessToken);

    //     let oauthToken = {
    //       accessToken: accessToken,
    //       source: source
    //     };
    //     this.setOAuthToken(oauthToken);
    //     return oauthToken;
    //   })
  }

  // private setOAuthToken(token: any) {
  //   localStorage.setItem(this.oauthTokenKey, JSON.stringify(token));
  // }

  // public getOAuthToken(): any {
  //   let token = localStorage.getItem(this.oauthTokenKey);
  //   return token ? JSON.parse(token) : null;
  // }

}
