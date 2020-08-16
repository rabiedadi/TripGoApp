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

  constructor(
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private detailS: DetailService) {
  }

  services: { name: string, icon: string, width: number }[] = [
    {name: 'Non fumeur', icon: 'smoke', width: 35},
    {name: 'Transport aeroport', icon: 'car', width: 40},
    {name: 'Wifi gratuit', icon: 'wifi', width: 40},
    {name: 'Climatisation', icon: 'snow', width: 30},
    {name: 'douche', icon: 'bath', width: 30},
    {name: 'Grande picine', icon: 'swimming', width: 40},
    {name: 'Restaurant', icon: 'chef_hat', width: 30},
  ];
  serviceIconRatio = 1;

  ngOnInit(): void {
    if (window.screen.width < 768) { // phones and small tabs
      this.serviceIconRatio = 0.8;
    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.detailS.getEstablishmentsDetails(this.id).subscribe(
        data => console.log(data)
    );
    this.commentCardWidth = (document.querySelector('.comment') as HTMLElement).offsetWidth;
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

}
