import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HotelComponent} from './hotel/hotel.component';
import {HouseComponent} from './house/house.component';
import {BuildingComponent} from './building/building.component';
import {OtherComponent} from './other/other.component';

const routes: Routes = [
  { path: 'hotel', component: HotelComponent },
  { path: 'house', component: HouseComponent },
  { path: 'building', component: BuildingComponent },
  { path: 'other', component: OtherComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstablishmentCreationRoutingModuleModule { }

export const EstablishmentCreationRoutingComponents = [HotelComponent, HouseComponent, BuildingComponent, OtherComponent];
