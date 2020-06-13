import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'plural'
})
export class PluralPipe implements PipeTransform {
    constructor() {
    }

    private irregularWords: { word: string, plural: { 0: string, 1: string, 2: string } }[] = [
        {word: 'child', plural: {0: 'Children', 1: 'Child', 2: 'Children'}},
        {word: 'année', plural: {0: 'Année', 1: 'Année', 2: 'Ans'}},
    ];

    public transform(value: string, count: number): string {
        const word = this.irregularWords.find(item => item.word === value.toLowerCase());
        if (word) {
            switch (count) {
                case 0 :
                    return word.plural['0'];
                case 1 :
                    return word.plural['1'];
                default :
                    return word.plural['2'];
            }
        } else {
            switch (count) {
                case 0 :
                    return value + 's';
                case 1 :
                    return value;
                default :
                    return value + 's';
            }
        }
    }
}
