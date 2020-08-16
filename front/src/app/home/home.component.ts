import {Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../mdl-shared/shared.service';
import {Observable} from 'rxjs';
import {AuthState} from '../store/reducers/auth.reducers';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.states';
import {MatDialog} from '@angular/material/dialog';
import {AllDialogsComponents} from './dialogs/dialogs.components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
  authState$: Observable<AuthState>;
  distance = 100;
  smallScreen = false;

  constructor(private sharedS: SharedService,
              private store: Store<AppState>,
              private dialog: MatDialog) {
    this.authState$ = store.select(state => state.auth);
  }
  ngOnInit(): void {
    if (window.screen.width < 768) { // phones and small tabs
      this.smallScreen = true;
    }
    this.distance = (document.getElementsByClassName('hotel-card-wrapper')[0] as HTMLElement).offsetWidth;
    this.openSurveyDialog();
  }

  ngAfterViewInit() {
    document.getElementsByClassName('content')[0].classList.add('content-bg');
  }

  openSurveyDialog() {
    this.dialog.open(AllDialogsComponents[0], {
      width: this.smallScreen ? '90%' : '50%',
      data: {}
    });
  }

  slideNext() {
    const container = document.getElementById('slide-container');
    this.sideScroll(container, 'right', 25, 100, 5);
  }

  slideBack() {
    const container = document.getElementById('slide-container');
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
      if (scrollAmount >= this.distance){
        window.clearInterval(slideTimer);
      }
    }, 8);
  }
}

