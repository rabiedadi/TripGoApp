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
import {SwUpdate} from '@angular/service-worker';

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
  inspirationCards: {text: string, img: string}[] = [
    {text: 'Découvrez Ghardaia de l\'intérieur', img: 'https://pbs.twimg.com/media/C-dEGt2XUAAMDX1.jpg'},
    {text: 'Constantine, ville des ponts suspendus', img: 'https://steemitimages.com/0x0/https://pli.io/f4YDM.jpg'},
    {text: 'Ne manquez pas l\'opportunité de nager dans les plages de Bejaia', img: 'https://izzoran.com/wp-content/uploads/2020/03/liste-des-plage-de-bejaia.jpg'},
    {text: 'Que diriez-vous de nuits tranquilles à Tamanrasset', img: 'https://i.pinimg.com/originals/f9/99/b0/f999b0adc1f1cd9e83f9a5c0efb5f717.jpg'},
    {text: 'Profitez de vos vacances à Oran', img: 'https://www.entv.dz/wp-content/uploads/2019/07/Oran_-de_Santa-Cruz.jpg'},
  ];

  constructor(private sharedS: SharedService,
              private store: Store<AppState>,
              private dialog: MatDialog,
              private updates$: Actions,
              private updates: SwUpdate
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
    this.updates.available.subscribe(event => { // service worker reload if updates are available
      this.updates.activateUpdate().then(_ => document.location.reload());
    });
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


  inspireImgHovered(state: boolean, $event: MouseEvent) {
    if (state) {
      ($event.target as HTMLElement).style.opacity = '0';
      (($event.target as HTMLElement).parentElement as HTMLElement).classList.add('hovered');
    } else {
      ($event.target as HTMLElement).style.opacity = '1';
      (($event.target as HTMLElement).parentElement as HTMLElement).classList.remove('hovered');

    }
  }
}

