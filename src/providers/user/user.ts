import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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

  public static userData: Subject<any> = new Subject();

  constructor(
    private http:    HttpHandler,
    private storage: Storage,
  ) {
    console.log('Hello UserProvider Provider');
  }

  public getUserInfo(): Promise<any> {
    return this.storage.get('user');
  }

  public refreshData(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.get('users/data').subscribe(data => {
        this.storeData(data).then(result => resolve(result));
      });
    });
    return promise;
  }

  private storeData(data): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.storage.set('user', data.user).then(() => {
        this.storage.set('pupils', data.pupils).then(() => {
          this.storage.set('coaches', data.coaches).then(() => {
            this.storage.set('workouts', data.workouts).then(() => {
              this.storage.set('givenWorkouts', data.givenWorkouts).then(() => {
                this.storage.set('createdWorkouts', data.createdWorkouts).then(() => {
                  this.storage.set('sports', data.sports).then(() => {
                    resolve(true);
                  });
                });
              });
            });
          });
        });
      });
    });

    return promise;
  }

}
