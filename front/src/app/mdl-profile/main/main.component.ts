import {Component, OnDestroy, OnInit, SecurityContext, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.states';
import {Observable, Subject} from 'rxjs';
import {AuthState} from '../../store/reducers/auth.reducers';
import {MatDialog} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import * as dialogsComponents from './dialogs/dialogs.components';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer} from '@angular/platform-browser';
import {ProfileService} from '../services/profile.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None })
export class MainComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  authState$: Observable<AuthState>;
  authState: AuthState;
  establishments$: Observable<any>;
  profilePicSrc = '';
  constructor(private store: Store<AppState>,
              private profileS: ProfileService,
              private dialog: MatDialog,
              private toast: ToastrService,
              public domSanitizer: DomSanitizer) {
    this.authState$ = store.select(state => state.auth);
  }

  ngOnInit(): void {
    document.getElementsByClassName('tab-label')[0].classList.add('active-tab-label');
    this.authState$.pipe(takeUntil(this.destroyed$)).subscribe(state => {
      console.log(state);
      this.authState = state;
      if (state.user) {
        this.profilePicSrc = this.domSanitizer.sanitize(SecurityContext.URL, 'http://51.91.79.72:3000/' + state.user?.image);
      }
    });
    this.establishments$ = this.profileS.getEstablishments();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  tab_selected(index) {
    let min: number;
    let max: number;
    let direction = true; /* up or down */
    let prevTabInd: Element;
    let nextTabInd: Element;
    if (index !== 5) {
      for (let i = 0; i < 8; i++) { // hide all tabs
        if (i === 5) {
          continue;
        }
        document.getElementsByClassName('tab-' + i)[0].classList.add('hidden');
      }
      // show only selected tab
      document.getElementsByClassName('tab-' + index)[0].classList.remove('hidden');
      document.getElementsByClassName('hidden-tab-label')[0].children[0].classList.remove('active');
      document.getElementsByClassName('hidden-tab-label')[0].children[1].classList.remove('active');
    }
    if (index === 6) {
      document.getElementsByClassName('hidden-tab-label')[0].children[0].classList.add('active');
      this.tab_selected(5);
      return;
    }
    if (index === 7) {
      document.getElementsByClassName('hidden-tab-label')[0].children[1].classList.add('active');
      this.tab_selected(5);
      return;
    }
    // initiate prev and next tab-indicator tabs 6 and 7 have no indicator
    for (let i = 0; i < 6; i++) {
      if (document.getElementsByClassName('tab-label')[i].classList.contains('active-tab-label')) {
        prevTabInd = document.getElementsByClassName('tab-label')[i].children[0];
        if (index > i) {
          max = index;
          min = i;
        } else {
          max = i;
          min = index;
          direction = false;
        }
      }
    }
    nextTabInd = document.getElementsByClassName('tab-indicator')[index];
    // set animation
    if (direction) {
      prevTabInd.classList.remove('top-0');
      prevTabInd.classList.add('bottom-0');
      nextTabInd.classList.remove('bottom-0');
      nextTabInd.classList.add('top-0');
    } else {
      prevTabInd.classList.remove('bottom-0');
      prevTabInd.classList.add('top-0');
      nextTabInd.classList.remove('top-0');
      nextTabInd.classList.add('bottom-0');
    }
    for (let i = min + 1; i < max; i++) {
      (document.getElementsByClassName('tab-indicator')[i] as HTMLElement).style.transition = 'none';
      (document.getElementsByClassName('tab-indicator')[i] as HTMLElement).style.height = '100%';
    }
    document.getElementsByClassName('tab-indicator')[5].classList.remove('active-tab-label');
    prevTabInd.parentElement.classList.remove('active-tab-label');
    nextTabInd.parentElement.classList.add('active-tab-label');
    setTimeout(() => {
      for (let i = min + 1; i < max; i++) {
        (document.getElementsByClassName('tab-indicator')[i] as HTMLElement).style.removeProperty('height');
      }
    }, 150);
  }

  sendEmailVerification() {
    this.profileS.sendVerificationEmail().subscribe(data => console.log(data));
  }

  openProfileInfoDialog() {
    this.dialog.open(dialogsComponents.ProfileInfoDialogComponent, {
      width: '350px',
      data: {state$: this.authState$, toast: this.toast}
    });
  }

  openEditPhoneDialog() {
    this.dialog.open(dialogsComponents.EditPhoneDialogComponent, {
      width: '350px',
      data: {state$: this.authState$, toast: this.toast}
    });
  }

  openEditEmailDialog() {
    this.dialog.open(dialogsComponents.EditEmailDialogComponent, {
      width: '350px',
      data: {state$: this.authState$, toast: this.toast}
    });
  }

  openEditPasswordDialog() {
    this.dialog.open(dialogsComponents.EditPasswordDialogComponent, {
      width: '350px',
      data: {state$: this.authState$, toast: this.toast}
    });
  }
}
