import {Component, OnInit} from '@angular/core';
import {} from 'googlemaps';
import {MatDialog} from '@angular/material/dialog';
import {GoogleMapComponent} from './dialogs/dialogs.components';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  services: { name: string, icon: string, width: number}[] = [
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
  }
  openMap() {
    this.dialog.open(GoogleMapComponent, {
      width: '90vw',
      height: '90vh',
      data: {}
    });
  }

}
