import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber',
})
export class FormatNumberPipe implements PipeTransform {

  /**
   * FORMATA UMA STRING NA MASCARA ESPECIFICADA
   *
   format('XX.XX.XX', 12345678); // "12.34.56"
   format('XXX-XXXX', 12345678); // "123-4567"
   format('XX-XX-XX', 12345678); // "12-34-56 "
   format('XX/XX/XX', 12345678); // "12/34/56"
   format('XX/XX/XX/XX/XX', 12345678); // "12/34/56/78"

   *
   * @param {string} mask   [description]
   * @param {string} number [description]
   */
  transform(number: string, mask: string) {
     let s = ''+number, r = '';
     for (let im=0, is = 0; im<mask.length && is<s.length; im++) {
       r += mask.charAt(im)=='X' ? s.charAt(is++) : mask.charAt(im);
     }
     return r;
   }
}
