import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    let v = value.split('-').join('');
    if (!Number(v)) { return ''; }
    v = v[0] === '0' ? v.substr(1, v.length) : v;
    let newV = '';
    let i = 0;
    const j = Math.floor(v.length / 2) - 1 >= 0 ? Math.floor(v.length / 2) - 1 : 0;
    for (; i <= j; i++) {
      if (i === 0) {
        newV = newV + v.substr(0, 2 + 1) + '-';
      }
      else {
        newV = newV + v.substr(i * 2 + 1, 2) + '-';
      }
    }
    // if (newV.length > 12) { newV = newV.slice(0, 12); }
    if (newV[newV.length - 1] === '-') { newV = newV.substr(0, newV.length - 1); }
    return newV;
  }

}
