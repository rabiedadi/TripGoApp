import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-google-map',
  templateUrl: 'templates/googleMap.html' })
export class GoogleMapComponent implements OnDestroy{
  zoom = 5;
  coordination = [28.0290, 1.6667];
  hotelCoordination = [35.70361040754744, -0.6476809399262926];
  constructor(private dialogRef: MatDialogRef<GoogleMapComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {}) {
  }
  destroyed$ = new Subject<boolean>();
  closeDialog() {
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  mapClicked(map) {
    if (map.lastOpen != null) {
      map.lastOpen.close();
    }
  }

  markerClicked(infoWindow, map) {
    if (map.lastOpen != null) {
      map.lastOpen.close();
    }
    map.lastOpen = infoWindow;
    infoWindow.open();
    this.coordination = this.hotelCoordination;
    this.zoom = 15;
  }
}
