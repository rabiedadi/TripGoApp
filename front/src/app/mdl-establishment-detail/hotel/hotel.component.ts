import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GoogleMapComponent} from './dialogs/dialogs.components';
import {ActivatedRoute, Router} from '@angular/router';
import {DetailService} from '../services/detail.service';
import {Gallery, GalleryItem, ImageItem} from '@ngx-gallery/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.states';
import {AuthState} from '../../store/reducers/auth.reducers';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NavbarComponent} from '../../mdl-shared/navbar/navbar.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit, OnDestroy {
  authState: AuthState;
  destroyed$ = new Subject<boolean>();
  id: string;
  commentCardWidth = 500;
  percentMatching = 97; // TODO
  establishment$: any;
  establishment = {name: '', stars: 0, note: 0};
  images = [
    {
      srcUrl: 'https://www.leonidastravel.com/wordpress/wp-content/uploads/2019/11/225068768-570x320.jpg',
      previewUrl: 'https://www.leonidastravel.com/wordpress/wp-content/uploads/2019/11/225068768-570x320.jpg'
    },
    {
      srcUrl: 'https://www.dolphorceglobal.ng/wp-content/uploads/2018/06/Hotel-Bookings.jpg',
      previewUrl: 'https://www.dolphorceglobal.ng/wp-content/uploads/2018/06/Hotel-Bookings.jpg'
    },
    {
      srcUrl: 'https://www.myboutiquehotel.com/photos/9327/room-181984473-1024x683.jpg',
      previewUrl: 'https://www.myboutiquehotel.com/photos/9327/room-181984473-1024x683.jpg'
    },
    {
      srcUrl: 'https://i.pinimg.com/originals/e8/f1/6c/e8f16c883bc93ecb211b6c8539f746f8.jpg',
      previewUrl: 'https://i.pinimg.com/originals/e8/f1/6c/e8f16c883bc93ecb211b6c8539f746f8.jpg'
    },
    {
      srcUrl: 'https://im.proptiger.com/1/2028673/80/project-in-sector-22-rohini-others-101057400.png',
      previewUrl: 'https://im.proptiger.com/1/2028673/80/project-in-sector-22-rohini-others-101057400.png'
    },
    {
      srcUrl: 'https://www.marketingtochina.com/wp-content/uploads/2016/05/hotel.jpg',
      previewUrl: 'https://www.marketingtochina.com/wp-content/uploads/2016/05/hotel.jpg'
    },
    {
      srcUrl: 'https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/hotels/1000000/530000/520600/520564/625420d8_z.jpg',
      previewUrl: 'https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/hotels/1000000/530000/520600/520564/625420d8_z.jpg'
    },
  ];
  imagesItems: GalleryItem[];
  @ViewChild('navbarComponent') navBar: NavbarComponent;

  constructor(
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private detailS: DetailService,
      private gallery: Gallery,
      private store: Store<AppState>,
      private router: Router,
      private toast: ToastrService) {
    store.select(state => state.auth).pipe(takeUntil(this.destroyed$)).subscribe(
        data => this.authState = data
    );
  }

  services: { name: string, icon: string}[] = [
    {name: 'Non fumeur', icon: 'smoking-ban'},
    {name: 'Transport aeroport', icon: 'shuttle-van'},
    {name: 'Wifi gratuit', icon: 'wifi'},
    {name: 'Climatisation', icon: 'snowflake'},
    {name: 'douche', icon: 'bath'},
    {name: 'Grande picine', icon: 'swimmer'},
    {name: 'Restaurant', icon: 'hat-chef'},
  ];
  offreServices: { name: string, icon: string}[] = [
    {name: 'Wifi gratuit', icon: 'wifi'},
    {name: 'Un grand lit', icon: 'bed-alt'},
    {name: 'douche', icon: 'shower'},
    {name: 'Executive lounge', icon: 'lamp-desk'},
    {name: 'Balcon', icon: 'window-frame-open'},
    {name: 'Surface de' + 44 + 'M', icon: 'vector-square'}
  ];

  ngOnInit(): void {
    if (!this.route.snapshot.paramMap.get('id')) {
      // TODO redirect to home page
    }

    if (this.route.snapshot.paramMap.get('info')) { // TODO to be deleted
      this.establishment.name = this.route.snapshot.paramMap.get('name');
      this.establishment.stars = Number(this.route.snapshot.paramMap.get('stars'));
      this.establishment.note = Number.parseFloat(this.route.snapshot.paramMap.get('note'));
      this.percentMatching = Number.parseFloat(this.route.snapshot.paramMap.get('note')) * 10;
    }
    this.establishment$ = this.detailS.getEstablishmentsDetails(this.route.snapshot.paramMap.get('id'));
    this.commentCardWidth = (document.querySelector('.comment') as HTMLElement).offsetWidth;
    this.setPercentMatchingCircle();
    this.imagesItems = this.images.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
    this.gallery.ref().load(this.imagesItems);
  }

  openMap() {
    this.dialog.open(GoogleMapComponent, {
      width: '90vw',
      height: '90vh',
      data: {}
    });
  }

  slideNext() {
    const container = document.getElementsByClassName('slide-container')[0];
    this.sideScroll(container, 'right', 25, 100, 30);
  }

  slideBack() {
    const container = document.getElementsByClassName('slide-container')[0];
    this.sideScroll(container, 'left', 25, 100, 30);
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
      if (scrollAmount >= this.commentCardWidth){
        window.clearInterval(slideTimer);
      }
    }, 5);
  }

  private setPercentMatchingCircle() {
    document.getElementById('percent-circle-container')
        .setAttribute('data-pct', this.percentMatching.toString());
    const circle = document.querySelector('#percent-circle-container circle') as HTMLElement;
    const radius = +circle.getAttribute('r').toString();
    const dashArr = +circle.getAttribute('stroke-dasharray').toString();
    const c = Math.PI * 2 * radius;
    const pct = ((100 - this.percentMatching) / 100) * c + (dashArr + 10 - c);
    setTimeout( _ => {
      circle.style.strokeDashoffset = pct.toString();
    }, 1500);
  }

  reserveNow() {
    if (!this.authState.isAuthenticated) {
      this.navBar.openDialog3();
    } else {
      if (!this.authState.user.emailConfirmed) {
        this.toast.warning('vous devez d\'abord confirmer votre email dans votre profile', '',
            {positionClass: 'toast-top-center', timeOut: 4000});
      } else {
        this.router.navigate([`/booking`]);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
