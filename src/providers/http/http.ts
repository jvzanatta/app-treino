import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable, Subject } from 'rxjs/Rx';
import { UserProvider } from '../user/user';
import { LoginProvider } from '../login/login';
import { EnvironmentConfig } from '../environment.config';
import { Storage } from '@ionic/storage';

@Injectable()
export class HttpHandler {

  private header: Headers;
  private API_URL: string = EnvironmentConfig.API_URL;


  constructor(
    private http: Http,
    private storage: Storage,
    // private platform: Platform
  ) {
    this.headers();
  }

  private headers() /*Headers*/ {
    UserProvider.getAuthInfo()
    .map(auth => new Headers({
      'Content-Type' : 'application/json',
      'Accept'       : 'application/json',
      'Authorization': 'Bearer '+ auth,
    }))
    .subscribe((header) => {
      this.header = header;
    });
  }

  private objToSearch(query: any): URLSearchParams {
    let parameters = new URLSearchParams();

    if (query) {
      for (let i in query) {
        if (query[i] instanceof Array) {
          for (let j in query[i]) {
            parameters.set(`${i}[${j}]`, query[i][j]);
          }
        } else {
          parameters.set(i, query[i]);
        }
      }
    }

    return parameters;
  }

  public get(route: string, query?: Object): Observable<Response> {
    let url: string  = this.API_URL + route;

    let options = new RequestOptions({
      headers: this.header,
      search: this.objToSearch(query)
    });

    return this.http.get(url, options)
        .map(res => res.json().data)
        .catch(error => this.handleError('GET', url, error))
  }

  public post(route: string, body: Object): Observable<Response> {
    let url: string = this.API_URL + route;

    return this.http.post(url, body, new RequestOptions({ headers: this.header }))
      .map(res => res.json().data)
      .catch(error => this.handleError('POST', url, error, body));
  }

  public patch(route: string, body: any): Observable<Response> {
    let url: string = this.API_URL + route;

    return this.http.patch(url, body, new RequestOptions({ headers: this.header }))
      .map(res => res.json().data)
      .catch(error => this.handleError('PATCH', url, error, body));
  }

  public delete(route: string): Observable<Response> {
    let url: string = this.API_URL + route;

    return this.http.delete(url, new RequestOptions({ headers: this.header }))
      .map(res => res.json().data)
      .catch(error => this.handleError('DELETE', url, error));
  }

  private handleError(method: string,  url:string, error: any, params?: Object): Observable<any> {
    let status = error.status;
    if (status === 401 || status === 403)
      LoginProvider.logout();

    console.warn('THE REQUEST FAILED!');
    console.warn('  METHOD: ' + method);
    console.warn('  URL   : ' + url);
    if (params) console.warn('  PARAMS   : ' + JSON.stringify(params));
    console.warn('  ERROR : ' + JSON.stringify(error));

    return Observable.throw(error);
  }

}
