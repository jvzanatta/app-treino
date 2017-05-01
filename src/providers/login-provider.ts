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
      localStorage.setItem('user', JSON.stringify(res.user));
      // localStorage.setItem('givenWorkouts', JSON.stringify(res.user.givenWorkouts));
      localStorage.setItem('auth', res.auth);
      res = res.user;
      console.log('login com sucesso');
    });
  }

  public static logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
  }

  public static getAuthInfo(): any {
    return localStorage.getItem('auth');
  }

}
