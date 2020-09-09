import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GoogleMapComponent} from './dialogs/dialogs.components';
import {ActivatedRoute} from '@angular/router';
import {DetailService} from '../services/detail.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  id: string;
  commentCardWidth = 500;
  percentMatching = 97; // TODO

  constructor(
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private detailS: DetailService) {
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.detailS.getEstablishmentsDetails(this.id).subscribe(
        data => console.log(data)
    );
    this.commentCardWidth = (document.querySelector('.comment') as HTMLElement).offsetWidth;
    this.setPercentMatchingCircle();
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
    }, 500);
  }
}
