import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable, Subject } from 'rxjs/Rx';
import { LoginProvider } from '../providers/login-provider';
import { EnvironmentConfig } from './environment.config';

@Injectable()
export class HttpInterceptor {

  private API_URL: string = EnvironmentConfig.API_URL;


  constructor(private http: Http, private platform: Platform) { }

  private getHeaders(): Headers {
    let authInfo      = LoginProvider.getAuthInfo();
    return new Headers({
      'Content-Type' : 'application/json',
      'Accept'       : 'application/json',
      'Authorization': authInfo ? (authInfo.token_type + ' ' + authInfo.access_token) : '',
    });
  }

  private parseParams(query: any): URLSearchParams {
    let searchParams = new URLSearchParams();
    if (!query) {
      return searchParams;
    }

    for (let i in query) {
      if (query[i] instanceof Array) {
        for (let j in query[i]) {
          searchParams.set(`${i}[${j}]`, query[i][j]);
        }
      } else {
        searchParams.set(i, query[i]);
      }
    }

    return searchParams;
  }

  public get(route: string, query?: Object): Observable<any> {
    let url: string  = this.API_URL + route;

    let options = new RequestOptions({ headers: this.getHeaders(), search: this.parseParams(query) });
    let requestObservable = new Observable(observer => {
      let request = this.http.get(url, options)
        .map(res => res.json().data)
        .catch(error => this.handleError('GET', url, error))
        .finally(() => observer.complete())
        .subscribe(
          data => observer.next(data),
          error => observer.error(error)
        );

    });

    return requestObservable;
  }

  public post(route: string, body: Object): Observable<any> {
    let url: string = this.API_URL + route;
    let options = new RequestOptions({ headers: this.getHeaders() });

    return this.http.post(url, body, options)
      .map(res => res.json().data)
      .catch(error => this.handleError('POST', url, error, body));
  }

  public patch(route: string, body: any): Observable<any> {
    let url: string = this.API_URL + route;
    let options = new RequestOptions({ headers: this.getHeaders() });

    return this.http.patch(url, body, options)
      .map(res => res.json().data)
      .catch(error => this.handleError('PATCH', url, error, body));
  }

  public delete(route: string): Observable<any> {
    let url: string = this.API_URL + route;
    let options = new RequestOptions({ headers: this.getHeaders() });

    return this.http.delete(url, options)
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
