import {NgModule} from '@angular/core';
import {EstablishmentDetailRoutingComponents, EstablishmentDetailRoutingModule} from './establishment-detail-routing.module';

import {SharedModule} from '../mdl-shared/shared.module';
import {CommonModule} from '@angular/common';
import {AgmCoreModule} from '@agm/core';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {GoogleMapComponent} from './hotel/dialogs/dialogs.components';

@NgModule({
  declarations: [EstablishmentDetailRoutingComponents, GoogleMapComponent],
  imports: [
    CommonModule,
    SharedModule,
    EstablishmentDetailRoutingModule,
    AngularSvgIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1h_wenME-_pPs12Sv7OzKd-3id8IbnxM'
    }),
  ]
})
export class EstablishmentDetailModule {

}
