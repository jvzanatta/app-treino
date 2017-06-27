import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HttpHandler } from '../http/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ContactProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContactProvider {

  constructor(
    public http:     HttpHandler,
    private storage: Storage,
  ) {
    console.log('Hello ContactProvider Provider');
  }

  public getPupils() {
    return this.storage.get('pupils').then(pupils => pupils = pupils.sort(this.orderByName));
  }

  public getCoaches() {
    return this.storage.get('coaches').then(pupils => pupils = pupils.sort(this.orderByName));
  }

  public getContacts() {
    let promise = new Promise((resolve, reject) => {
      this.getPupils().then(pupils => {
        this.getCoaches().then(coaches => {
          resolve(this.combineAndOrder(pupils, coaches));
        });
      });
    });

    return promise;
  }

  private combineAndOrder(contacts1: Array<any>, contacts2: Array<any>): Array<any> {
    return contacts1.concat(contacts2).filter((contact, index, contacts) => {
      return !contacts.slice(index+1).find(item => item.id === contact.id);
    });
  }

  private orderByName(a: any, b: any) {
    return a.first_name < b.first_name ? -1 : a.first_name > b.first_name ? 1 : a.last_name < b.last_name ? -1 : 1;
  }

}
