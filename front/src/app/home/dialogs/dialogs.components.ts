import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.states';
import {Observable, Subject} from 'rxjs';
import {AuthState} from '../../store/reducers/auth.reducers';

@Component({
    selector: 'app-dialog-survey',
    templateUrl: 'templates/survey-dialog.html',
    styleUrls: ['./templates/survey-dialog.css']})
export class SurveyDialogComponent implements OnDestroy {
    constructor(public dialogRef: MatDialogRef<SurveyDialogComponent>,
                private store: Store<AppState>,
                @Inject(MAT_DIALOG_DATA) public data: { state$: Observable<AuthState>}) {
        this.selectedSurvey = this.survey.find(s => s.title === this.selectedSurveyTitle);
    }
    destroyed$ = new Subject<boolean>();
    selectedSurveyTitle = 'tourismeOuTravail';
    selectedSurvey: any;
    selectedChoice = null;
    survey = [
        {
            title: 'tourismeOuTravail',
            status: 'active',
            type: 'choice',
            message: 'Vous voyagez souvent pour le tourisme ou pour le travail ?',
            choices: [
                { choice: 'Tourisme', img: 'https://srilankamirror.com/media/k2/items/cache/5c929647c26cba5043d8d1e7352ebc42_XL.jpg?t=20200518_182610', nextTitle: 'villeOuNature' },
                { choice: 'Travail', img: 'data:image/jpeg;base64,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', nextTitle: 'villePlusVisités' }
            ]
        }, {
            title: 'villeOuNature',
            type: 'choice',
            message: 'Vous préférez la ville ou la nature',
            choices: [
                { choice: 'ville', img: 'https://webunwto.s3.eu-west-1.amazonaws.com/styles/slider/s3/2020-07/200730-travel-restrictions_0.jpg?itok=NBYof7bK', nextTitle: 'anciennesOuModernes' },
                { choice: 'nature', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRd9TWK0IelS1K76nuSeclkKJYqYkJF-_CxZg&usqp=CAU', nextTitle: 'natureType' }
            ]
        }, {
            title: 'villePlusVisités',
            type: 'select',
            message: 'Quelles sont les villes les plus souvent visités ?',
            list: ['01 Adrar', '02 Chlef', '03 Laghouat', '04 Oum-ElBouaghi', '05 Batna', '06 Béjaïa', '07 Biskra', '08 Béchar', '09 Blida', '10 Bouira', '11 Tamanrasset', '12 Tébessa', '13 Tlemcen', '14 Tiaret', '15 Tizi-Ouzou', '16 Alger', '17 Djelfa', '18 Jijel', '19 Sétif', '20 Saida', '21 Skikda', '22 Sidi-BelAbbès', '23 Annaba', '24 Guelma', '25 Constantine', '26 Médéa', '27 Mostaganem', '28 M\'Sila', '29 Mascara', '30 Ouargla', '31 Oran', '32 El-Bayadh', '33 illizi', '34 Bordj-BouArreridj', '35 Boumerdès', '36 El-Taref', '37 Tindouf', '38 Tissemsilt', '39 El-Oued', '40 Khenchela', '41 Souk-Ahras', '42 Tipaza', '43 Mila', '44 Aïn-Defla', '45 Naâma', '46 AïnTémouchent', '47 Ghardaia', '48 Relizane'],
            nextTitle: 'seulOuSociete'
        }, {
            title: 'natureType',
            type: 'selectWithIMGs',
            message: '',
            choices: [
                { choice: 'Mer', img: '', nextTitle: '' },
                { choice: 'Sahara', img: '', nextTitle: '' },
                { choice: 'Desert', img: '', nextTitle: '' }
            ],
            nextTitle: ''
        }, {
            title: 'anciennesOuModernes',
            status: '',
            type: 'choice',
            message: 'vous préférez les villes anciennes Ou Modernes',
            choices: [
                { choice: 'Anciennes', img: '', nextTitle: ''},
                { choice: 'Modernes', img: '', nextTitle: ''}
            ],
            nextTitle: ''
        }, {
            title: 'seulOuSociete',
            status: 'active',
            type: 'choice',
            message: 'vous travailler pour vous-même ou pour une société ?',
            choices: [
                { choice: 'Seul', img: 'https://www.bestar.com/wp-content/uploads/2019/05/freelancer-on-his-computer.jpeg', nextTitle: '' },
                { choice: 'Societe', img: 'https://assets-global.website-files.com/5ac46dd2c3ce7d464cd0c44e/5d6e4421ba96458aec19d884_company-business-structure.jpg', nextTitle: '' }
            ],
            nextTitle: ''
        }
    ];
    closeDialog() {
        this.dialogRef.close();
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    preselecteChoice(choiceNb: number, value: number) {
        const surveyProgressContainer1 =
            document.getElementsByClassName('survey-progerss-container')[choiceNb] as HTMLElement;
        const surveyProgressContainer2 =
            document.getElementsByClassName('survey-progerss-container')[Math.abs(choiceNb - 1)] as HTMLElement;
        for (let i = 0; i < 5; i++) {
            (surveyProgressContainer2.children[i] as HTMLElement).style.backgroundColor = 'rgba(91,99,109,1)';
        }
        for (let i = 0; i < 5; i++) {
            (surveyProgressContainer1.children[i] as HTMLElement).style.backgroundColor = 'rgba(91,99,109,1)';
        }
        this.selectedChoice = choiceNb;
        for (let i = 0; i < value; i++) {
            (surveyProgressContainer1.children[i] as HTMLElement).style.backgroundColor = 'rgba(20, 133, 215, 1)';
        }
    }

    nextSurvey() {
        const s = this.survey.find(_ => _.title === this.selectedSurveyTitle);
        if (s.type === 'choice') {
            console.log(s.choices[this.selectedChoice].nextTitle);
            this.selectedSurveyTitle = s.choices[this.selectedChoice].nextTitle;
        } else {
            this.selectedSurveyTitle = s.nextTitle;
        }
        if (this.selectedSurveyTitle === '') {
            this.closeDialog();
        }
        this.selectedSurvey = this.survey.find(_ => _.title === this.selectedSurveyTitle);
    }
}
export const AllDialogsComponents = [SurveyDialogComponent];
