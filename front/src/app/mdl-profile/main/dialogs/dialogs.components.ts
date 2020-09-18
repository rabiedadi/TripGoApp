import {Component, Inject, OnDestroy, SecurityContext} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.states';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AuthState} from '../../../store/reducers/auth.reducers';
import {ResetMessages, UserEditInfo, UserEditPWD} from '../../../store/actions/auth.actions';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-profile-info',
  templateUrl: 'templates/profile-info-dialog.html' })
export class ProfileInfoDialogComponent implements OnDestroy{
  constructor(private dialogRef: MatDialogRef<ProfileInfoDialogComponent>,
              private store: Store<AppState>,
              private domSanitizer: DomSanitizer,
              @Inject(MAT_DIALOG_DATA) public data: { state$: Observable<AuthState>, toast: ToastrService }) {
    data.state$.pipe(takeUntil(this.destroyed$)).subscribe( state => {
      this.editedImage.imageSRC = this.domSanitizer.sanitize(SecurityContext.URL, 'http://51.91.79.72:3000/' + state.user?.image);
      this.currentFullName = state.user?.fullName ? state.user?.fullName : undefined;
      this.fullName = state.user?.fullName ? state.user?.fullName : undefined;
      if (state.SuccessMessage?.split(':')[0] === 'userInfo') {
        this.closeDialog();
        data.toast.success('Profile information successfully updated.', '', { positionClass: 'toast-top-center', timeOut: 4000 });
        this.store.dispatch(new ResetMessages('SuccessMessage'));
      }
      if (state.FailureMessage?.split(':')[0] === 'userInfo') {
        this.errorMessage = state.FailureMessage.split(':')[1];
        this.uploading = false;
        this.store.dispatch(new ResetMessages('FailureMessage'));
      }
    });
  }
  destroyed$ = new Subject<boolean>();
  currentFullName: string;
  fullName: string;
  image: any;
  newImage = false;
  editedImage = {imageSRC: ''};
  errorMessage: string;
  uploading = false;
  prepareProfilePicture(file: any) {
    const object = {
      imageSRC: undefined
    };
    const reader = new FileReader();
    reader.onload = () => {
      object.imageSRC = reader.result;
    };
    reader.readAsDataURL(file);
    this.image = file;
    this.editedImage = object;
    this.errorMessage = this.image.size > 1000000 ? 'too large image size' : undefined;
    this.newImage = true;
  }
  saveProfileInfo() {
    const fd = new FormData();
    if (!this.newImage && this.fullName === this.currentFullName) { this.errorMessage = 'No changes !!!'; }
    else {
      if (this.newImage && this.image.size < 1000000) {
        fd.append('image', this.image);
      }
      if (this.fullName !== this.currentFullName) {
        fd.append('fullName', this.fullName);
      }
      this.store.dispatch(new UserEditInfo(fd));
      this.uploading = true;
    }
  }
  closeDialog() {
    this.errorMessage = null;
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

@Component({
  selector: 'app-dialog-edit-email',
  templateUrl: 'templates/edit-mail-dialog.html'})
export class EditEmailDialogComponent implements OnDestroy {
  constructor(public dialogRef: MatDialogRef<EditEmailDialogComponent>,
              private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: { state$: Observable<AuthState>, toast: ToastrService }) {
    data.state$.pipe(takeUntil(this.destroyed$)).subscribe( state => {
      this.email = state.user.email;
      if (state.SuccessMessage?.split(':')[0] === 'userInfo') {
        this.closeDialog();
        data.toast.success('Email successfully updated.', '', { positionClass: 'toast-top-center', timeOut: 4000 });
        this.store.dispatch(new ResetMessages('SuccessMessage'));
      }
      if (state.FailureMessage?.split(':')[0] === 'userInfo') {
        this.errorMessage = state.FailureMessage.split(':')[1];
        this.store.dispatch(new ResetMessages('FailureMessage'));
      }
    });
  }
  destroyed$ = new Subject<boolean>();
  email = '';
  errorMessage: string;
  saveEmail() {
    const fd = new FormData();
    fd.append('email', this.email);
    this.store.dispatch(new UserEditInfo(fd));
  }
  closeDialog() {
    this.errorMessage = null;
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

@Component({
  selector: 'app-dialog-edit-phone',
  templateUrl: 'templates/edit-phone-dialog.html' })
export class EditPhoneDialogComponent implements OnDestroy {
  constructor(public dialogRef: MatDialogRef<EditPhoneDialogComponent>,
              private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: { state$: Observable<AuthState>, toast: ToastrService }) {
    data.state$.pipe(takeUntil(this.destroyed$)).subscribe( state => {
      this.phone = state.user.phone ? state.user.phone : '';
      if (state.SuccessMessage?.split(':')[0] === 'userInfo') {
        this.closeDialog();
        data.toast.success('Phone number successfully updated.', '', { positionClass: 'toast-top-center', timeOut: 4000 });
        this.store.dispatch(new ResetMessages('SuccessMessage'));
      }
      if (state.FailureMessage?.split(':')[0] === 'userInfo') {
        this.errorMessage = state.FailureMessage.split(':')[1]; // TODO show error messages
        this.store.dispatch(new ResetMessages('FailureMessage'));
      }
    });
  }
  destroyed$ = new Subject<boolean>();
  phone = '';
  errorMessage: string;
  savePhoneNumber() {
    const fd = new FormData();
    fd.append('phone', this.phone.split('-').join(''));
    this.store.dispatch(new UserEditInfo(fd));
  }
  closeDialog() {
    this.errorMessage = null;
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

@Component({
  selector: 'app-dialog-edit-password',
  templateUrl: 'templates/edit-password-dialog.html' })
export class EditPasswordDialogComponent implements OnDestroy {
  constructor(public dialogRef: MatDialogRef<EditPasswordDialogComponent>,
              private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: { state$: Observable<AuthState>, toast: ToastrService }) {
    data.state$.pipe(takeUntil(this.destroyed$)).subscribe( state => {
      if (state.SuccessMessage?.split(':')[0] === 'userInfo') {
        this.closeDialog();
        data.toast.success('Password successfully updated.', '', { positionClass: 'toast-top-center', timeOut: 4000 });
        this.store.dispatch(new ResetMessages('SuccessMessage'));
      }
      if (state.FailureMessage?.split(':')[0] === 'userInfo') {
        this.errorMessage = state.FailureMessage.split(':')[1];
        this.store.dispatch(new ResetMessages('FailureMessage'));
      }
    });
  }
  destroyed$ = new Subject<boolean>();
  oldPWD = '';
  newPWD1 = '';
  newPWD2 = '';
  errorMessage: string;
  saveNewPassword() {
    if (this.newPWD1.length < 8) {
      this.errorMessage = 'password must be at least of 8 characters';
    } else if (this.newPWD1 !== this.newPWD2){
      this.errorMessage = 'these passwords don\'t match';
    } else if (this.oldPWD === this.newPWD1) {
      this.errorMessage = 'u can\'t use the same password again';
    } else {
      this.store.dispatch(new UserEditPWD({old_password: this.oldPWD, new_password: this.newPWD1}));
    }
  }
  closeDialog() {
    this.errorMessage = null;
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

@Component({
    selector: 'app-dialog-add-offer',
    templateUrl: 'templates/add-offer-dialog.html',
    styleUrls: ['templates/add-offer-dialog.css']
})
export class AddOfferDialogComponent implements OnDestroy {
    constructor(public dialogRef: MatDialogRef<AddOfferDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { state$: Observable<AuthState> }) {
    }

    destroyed$ = new Subject<boolean>();
    offerType: string;
    service = [
        'service 1',
        'service 2',
        'service 3',
        'service 4',
        'service 5',
        'service 6',
        'service 8',
        'service 9',
        'service 10',
        'service 11'
    ];
    PersonsNb: 2;
    pricePerNight: any;

    closeDialog() {
        this.dialogRef.close();
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

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
  selectedSurveyTitle = 'previousRating';
  selectedSurvey: any;
  selectedChoice = null;
  survey = [
    {
      title: 'previousRating',
      type: 'stars',
      globalNote: 0,
      locationNote: 0,
      servicesNote: 0,
      receptionNote: 0,
      communicationNote: 0,
      message: 'Si votre hôtel est répertorié sur un autre site et a des notes, veuillez les cité ici',
      nextTitle: 'tourismeOuTravail'
    }, {
      title: 'tourismeOuTravail',
      type: 'choice',
      message: 'Votre hôtel se trouve dans un lieu touristique ou bien milieu des affaires',
      choices: [
        { choice: 'Touristique', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQEau_0oYvigJPoA42adWlfCQMIUuLmItzT6g&usqp=CAU', nextTitle: 'villeOuNature' },
        { choice: 'affaires', img: 'https://www.paymentsense.com/uk/blog/wp-content/uploads/2019/01/best-cities-to-start-a-business-2019-e1547472524143.jpg', nextTitle: 'aaa' }
      ]
    }, {
      title: 'villeOuNature',
      type: 'choice',
      message: 'Votre hôtel se trouve dans une zone urbaine ou naturelle ?',
      choices: [
        { choice: 'Urbaine', img: 'https://webunwto.s3.eu-west-1.amazonaws.com/styles/slider/s3/2020-07/200730-travel-restrictions_0.jpg?itok=NBYof7bK',
          nextTitle: 'ancienOuModern' },
        { choice: 'naturelle', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRd9TWK0IelS1K76nuSeclkKJYqYkJF-_CxZg&usqp=CAU',
          nextTitle: 'natureType' }
      ]
    }, {
      title: 'ancienOuModern',
      type: 'choice',
      message: 'Votre hôtel se trouve dans un endroit moderne ou ancien ?',
      choices: [
        { choice: 'Moderne', img: 'https://pix10.agoda.net/hotelImages/96605/-1/dd32d9b188d86d6d8dc40d1ff9a0ebf6.jpg?s=1024x768',
          nextTitle: 'aaa' },
        { choice: 'Ancien', img: 'https://i.pinimg.com/originals/6d/29/39/6d2939af5eff46f20669705eeaab78f8.jpg',
          nextTitle: 'natureType' }
      ]
    }, {
      title: 'aaa',
      type: 'simpleChoice',
      message: 'disposez-vous des chauffeurs pour vos clients ?',
      choices: [
        { choice: 'Oui', img: 'https://webunwto.s3.eu-west-1.amazonaws.com/styles/slider/s3/2020-07/200730-travel-restrictions_0.jpg?itok=NBYof7bK',
          nextTitle: 'anciennesOuModernes' },
        { choice: 'Non', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRd9TWK0IelS1K76nuSeclkKJYqYkJF-_CxZg&usqp=CAU',
          nextTitle: 'natureType' }
      ]
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

  selectedSimpleChoice($event) {
    Array.from(document.getElementsByClassName('survey-card')).forEach(e => {
      (e as HTMLElement).style.backgroundColor = 'rgba(91, 99, 109, 1)';
    });
    console.log($event.target);
    $event.stopPropagation();
    const item = $event.target as HTMLElement;
    item.style.backgroundColor = 'rgba(20, 133, 215, 1)';
  }

}

export const AllDialogsComponents = [
  ProfileInfoDialogComponent,
  EditPasswordDialogComponent,
  EditPhoneDialogComponent,
  EditEmailDialogComponent,
  AddOfferDialogComponent,
  SurveyDialogComponent
];
