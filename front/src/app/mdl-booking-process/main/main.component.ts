import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.states';
import {AuthState} from '../../store/reducers/auth.reducers';
import {MainService} from '../main.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../mdl-shared/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  step = 2;
  authState: AuthState;
  firstName = '';
  lastName = '';
  email = '';
  totalNights: number;
  daysAway: number;

  guestsInfos: {
    fullName: string,
    email: string;
  }[] = [];
  roomsNb = 1;
  phone = '';
  constructor(
      private store: Store<AppState>,
      private mainS: MainService,
      private router: Router,
      private toast: ToastrService,
      public sharedS: SharedService) {
    for (let i = 0; i < this.roomsNb; i++) {
      this.guestsInfos.push({fullName: '', email: ''});
    }
    store.select(state => state.auth).subscribe(
        data => this.authState = data
    );
  }

  ngOnInit(): void {
    if (this.sharedS.Date1 && this.sharedS.Date2) {
      this.totalNights = Math.ceil((Math.abs(this.sharedS.Date1.getTime() - this.sharedS.Date2.getTime())) / (1000 * 3600 * 24));
      this.daysAway = Math.ceil((Math.abs(this.sharedS.Date1.getTime() - this.sharedS.currentDate.getTime())) / (1000 * 3600 * 24));
    } else {
      this.router.navigate(['/']);
    }
  }

  inputFocusedBlurred(event: any, state: boolean) {
    state ?
        (event.target as HTMLElement).parentElement.classList.add('input-focused') :
        (event.target as HTMLElement).parentElement.classList.remove('input-focused')
    ;
  }

  passToStep3() {
    const step3Sections = document.getElementsByClassName('step3-section');
    const step2Sections = document.getElementsByClassName('step2-section');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < step2Sections.length; i++) {
      (step2Sections[i] as HTMLElement).style.opacity = '0';
      setTimeout(_ => {
        (step2Sections[i] as HTMLElement).style.display = 'none';
      }, 1500);
    }
    setTimeout(_ => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < step3Sections.length; i++) {
        (step3Sections[i] as HTMLElement).style.display = 'flex';
        (step3Sections[i] as HTMLElement).style.opacity = '1';
      }
      (document.querySelector('.progress-step.active') as HTMLElement).classList.remove('active');
      (document.querySelector('.progress-step.inactive') as HTMLElement).classList.add('active');
      (document.querySelector('.progress-step.inactive') as HTMLElement).classList.remove('inactive');
      this.step = 3;
    }, 1500);
  }

    completeBooking() {
      this.mainS.completeBooking(this.authState.user.email).subscribe(data => {
        if (data.message === 'sent') {
          this.toast.info('Une facture qui contient plus de détails a été envoyé à: ' + this.authState.user.email, '',
              {positionClass: 'toast-top-center', timeOut: 6000});
          this.toast.success('le processus de réservation s\'est terminé avec succès ', '',
              {positionClass: 'toast-top-center', timeOut: 3000});
          setTimeout(_ => {
            this.router.navigate(['/profile']);
          }, 5200);
        }
      });
    }
}
