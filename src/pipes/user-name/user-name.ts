import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the UserNamePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'userName',
})
export class UserNamePipe implements PipeTransform {

  transform(user: any, mode: string) {
    let name;

    switch(mode) {
        case 'full':
            if (user.first_name != user.last_name) {
              name = user.first_name + ' ' + user.last_name;
            } else {
              name = user.first_name;
            }
            break;
        case 'nick':
            name = user.nick_name || user.first_name;
            break;
        default:
            name = user.first_name;
    }

    return name;
  }
}
