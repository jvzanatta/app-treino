import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SportsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SportProvider {

  constructor(public http: Http) {
    console.log('Hello SportsProvider Provider');
  }

  public static getSports() {
    return JSON.parse(localStorage.getItem('sports')) || [];
  }

  public static getSport(sportId) {
    return this.getSports().find(sport => sport.id == sportId);
  }



}
