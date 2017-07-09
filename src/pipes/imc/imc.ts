import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imc',
})
export class ImcPipe implements PipeTransform {

  /**
   * Calcula o IMC independente da ordem dos parâmetros
   *
   * @param {number} value1 [description]
   * @param {number} value2 [description]
   */
  transform(value1: number, value2: number): string {
    // Garante que peso é o valor 1
    if (value1 < value2) {
      let tmp = value1;
      value1 = value2;
      value2 = tmp;
    }

    // Calcula e devolve
    return (value1 / Math.pow(value2, 2)).toFixed(2).toString();
  }
}
