import {Component, OnInit, AfterViewInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {SharedService} from '../mdl-shared/shared.service';
import {Observable, Subject} from 'rxjs';
import {AuthState} from '../store/reducers/auth.reducers';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.states';
import {MatDialog} from '@angular/material/dialog';
import {HomeDialogsComponents} from './dialogs/dialogs.components';
import {Actions, ofType} from '@ngrx/effects';
import {AuthActionTypes} from '../store/actions/auth.actions';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  distance = 100;
  smallScreen = false;
  authState$: Observable<AuthState>;
  authState: AuthState;
  destroyed$ = new Subject<boolean>();

  constructor(private sharedS: SharedService,
              private store: Store<AppState>,
              private dialog: MatDialog,
              private updates$: Actions
  ) {
    this.authState$ = store.select(state => state.auth);
    this.authState$.pipe(takeUntil(this.destroyed$)).subscribe(
        data => this.authState = data
    );
    updates$.pipe(
        ofType(AuthActionTypes.SUCCESS),
        takeUntil(this.destroyed$),
        tap(() => {
          if (this.authState.SuccessMessage.split(':')[1].indexOf('signup success') !== -1) {
            setTimeout(() => {
              this.openSurveyDialog();
            }, 5000);
          }
        })
    ).subscribe(); // TODO use authState messages instead
  }
  ngOnInit(): void {
    if (window.screen.width < 768) { // phones and small tabs
      this.smallScreen = true;
    }
    this.distance = (document.getElementsByClassName('hotel-card-wrapper')[0] as HTMLElement).offsetWidth;
  }

  ngAfterViewInit() {
    document.getElementsByClassName('bg-wrapper')[0].classList.add('bg-img');
  }

  openSurveyDialog() {
    this.dialog.open(HomeDialogsComponents[0], {
      width: this.smallScreen ? '90%' : '50%',
      data: {}
    });
  }

  slideNext() {
    const container = document.getElementById('slider-container');
    this.sideScroll(container, 'right', 25, 100, 5);
  }

  slideBack() {
    const container = document.getElementById('slider-container');
    this.sideScroll(container, 'left', 25, 100, 5);
  }

  sideScroll(element, direction, speed, distance, step){
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      if (direction === 'left'){
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= this.distance) {
        window.clearInterval(slideTimer);
      }
    }, 8);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

