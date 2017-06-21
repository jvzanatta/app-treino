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
    // console.log('getSport', sportId, this.getSports().find(sport => sport.id == sportId));
    return this.getSports().find(sport => sport.id == sportId);
  }

  public static getGroup(sportId, groupId) {
    // console.log('getGroup', sportId, groupId, this.getSport(sportId));
    return this.getSport(sportId).groups.find(group => group.id === groupId);
  }

  public static getGroupName(sportId, groupId) {
    // console.log('getGroupName', sportId, groupId, this.getGroup(sportId, groupId));
    return this.getGroup(sportId, groupId).name;
  }

}
