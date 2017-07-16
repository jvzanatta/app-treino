import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHandler } from '../http/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ChatProvider {

  constructor(public http: HttpHandler) {
    // console.log('Hello ChatProvider Provider');
  }

  public getMessagesFrom(contactId: number, offset: number = null, limit: number = null): Observable<any> {
    let url = 'messages/between/' + contactId;
    url += offset ? '/offset/' + offset : '';
    url += limit ? '/limit/' + limit : '';

    return this.http.get(url);
  }

  public post(contactId, message: string): Observable<any> {
    let body = {body: message};
    return this.http.post('messages/to/' + contactId, body);
  }

  public countNewFrom(contactId: number): Observable<any> {
    return this.http.get('messages/from/' + contactId + '/new/count');
  }
}
