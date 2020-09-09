import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngForCount'
})
export class NgForCountPipe implements PipeTransform {

  transform(value: number) {
    return (new Array(value)).fill(1);
  }

}
