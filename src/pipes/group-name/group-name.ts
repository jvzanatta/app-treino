import { Pipe, PipeTransform } from '@angular/core';
import { SportProvider } from '../../providers/sport/sport';

/**
 * Generated class for the GroupNamePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'groupName',
})
export class GroupNamePipe implements PipeTransform {

  transform(groupId: number, sportId: number) {
    // console.log('GroupNamePipe', groupId, sportId, SportProvider.getGroupName(sportId, groupId));

    return SportProvider.getGroupName(sportId, groupId) || '';
  }
}
