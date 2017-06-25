import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


import { HttpHandler } from '../http/http';

/*
  Generated class for the SportsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SportProvider {

  constructor(
    public http:     HttpHandler,
    private storage: Storage,
  ) {
    console.log('Hello SportsProvider Provider');
  }

  public getSports() {
    return this.storage.get('sports');
  }

  public getSport(sportId) {
    // console.log('getSport', sportId, this.getSports().find(sport => sport.id == sportId));
    return this.getSports().then(allSports => allSports.find(sport => sport.id == sportId));
  }

  public getGroup(sportId, groupId) {
    // console.log('getGroup', sportId, groupId, this.getSport(sportId));
    return this.getSport(sportId).then(sport => sport.groups.find(group => group.id === groupId));
  }

  public getGroupName(sportId, groupId) {
    // console.log('getGroupName', sportId, groupId, this.getGroup(sportId, groupId));
    return this.getGroup(sportId, groupId).then(group => group.name);
  }

}
