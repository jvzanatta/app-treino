import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HttpHandler } from '../http/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ContactProvider {

  constructor(
    public http:     HttpHandler,
    private storage: Storage,
  ) {
    // console.log('Hello ContactProvider Provider');
  }

  public getPupils(): Promise<any> {
    return this.storage.get('pupils').then(pupils => pupils = pupils.sort(this.orderByName));
  }

  public getCoaches(): Promise<any> {
    return this.storage.get('coaches').then(pupils => pupils = pupils.sort(this.orderByName));
  }

  public getContacts(): Promise<any> {
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

  private orderByName(a: any, b: any): number {
    return a.first_name < b.first_name ? -1 : a.first_name > b.first_name ? 1 : a.last_name < b.last_name ? -1 : 1;
  }

  public addPupil(email): Promise<any> {
    let promise =  new Promise((resolve, reject) => {
      this.http.post('coaches/users', email)
        .subscribe(pupil => {
          // console.log('pupil', pupil);
          this.storage.get('pupils')
            .then(pupils => {
              pupils.push(pupil);
              this.storage.set('pupils', pupils)
                .then(() => resolve(true));
            });
        }, error => reject(error));
    });
    return promise;
  }

  public removePupil(id): Promise<any> {
    let promise =  new Promise((resolve, reject) => {
      this.http.delete('coaches/users/' + id)
        .subscribe(result => {
          // console.log('result', result);
          if (result) {
            this.storage.get('pupils')
              .then(pupils => {
                pupils = pupils.filter(pupil => pupil.id != id);
                this.storage.set('pupils', pupils)
                  .then(() => resolve(true));
              });
          }
        }, error => reject(error));
    });
    return promise;
  }

}
