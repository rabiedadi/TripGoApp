import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HotelComponent} from './hotel/hotel.component';
import {HouseComponent} from './house/house.component';
import {BuildingComponent} from './building/building.component';
import {OtherComponent} from './other/other.component';

const routes: Routes = [
  { path: 'hotel/:id', component: HotelComponent },
  { path: 'house/:id', component: HouseComponent },
  { path: 'building/:id', component: BuildingComponent },
  { path: 'other/:id', component: OtherComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstablishmentDetailRoutingModule { }

export const EstablishmentDetailRoutingComponents = [ HotelComponent, HouseComponent, BuildingComponent, OtherComponent ];
