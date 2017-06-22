import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../providers/http-interceptor-provider';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  private endpoint = 'user/login';

  constructor(private http: HttpInterceptor) {

  }

  public login(values: any): Observable<any> {
    let data = {
      email: values.email,
      password: values.password
    };

    return this.http.post(this.endpoint, data).map(res => {
      this.storeData(res);
    });
  }

  private storeData(res) {
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('auth', res.auth);
    localStorage.setItem('pupils', JSON.stringify(res.pupils));
    localStorage.setItem('coaches', JSON.stringify(res.coaches));
    localStorage.setItem('workouts', JSON.stringify(res.workouts));
    localStorage.setItem('givenWorkouts', JSON.stringify(res.givenWorkouts));
    localStorage.setItem('createdWorkouts', JSON.stringify(res.createdWorkouts));
    localStorage.setItem('sports', JSON.stringify(res.sports));
  }

  public static logout(): void {
    localStorage.clear();
  }

  public static getAuthInfo(): any {
    return localStorage.getItem('auth');
  }

}
