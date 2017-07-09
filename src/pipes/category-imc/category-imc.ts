import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'categoryImc',
})
export class CategoryImcPipe implements PipeTransform {

  categories: Array<string> = [
    'Muito abaixo do peso',
    // Abaixo de 17  Muito abaixo do peso
    'Abaixo do peso',
    // Entre 17 e 18,49  Abaixo do peso
    'Peso normal',
    // Entre 18,5 e 24,99  Peso normal
    'Acima do peso',
    // Entre 25 e 29,99  Acima do peso
    'Obesidade I',
    // Entre 30 e 34,99  Obesidade I
    'Obesidade II',
    // Entre 35 e 39,99  Obesidade II (severa)
    'Obesidade III',
    // Acima de 40  Obesidade III (mórbida)
  ];

  transform(imcValue: string) {
    let category = '',
      imc = parseFloat(imcValue.replace(',', '.'));

    if (17 > imc) {
      category = this.categories[0];
    } else if (17 <= imc && 18.5 > imc) {
      category = this.categories[1];
    } else if (18.5 <= imc && 25 > imc) {
      category = this.categories[2];
    } else if (25 <= imc && 30 > imc) {
      category = this.categories[3];
    } else if (30 <= imc && 35 > imc) {
      category = this.categories[4];
    } else if (35 <= imc && 40 > imc) {
      category = this.categories[5];
    } else if (40 <= imc) {
      category = this.categories[6];
    }

    return imcValue + ' - ' + category;
  }
}
