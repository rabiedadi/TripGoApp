import { NgModule } from '@angular/core';
import { EstablishmentCreationRoutingComponents, EstablishmentCreationRoutingModuleModule} from './establishment-creation-routing.module';
import { DragDropDirective } from './direcitves/dragDrop.directive';
import { SharedModule } from '../mdl-shared/shared.module';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatRadioModule } from '@angular/material/radio';
import {AngularSvgIconModule} from 'angular-svg-icon';

@NgModule({
  declarations: [EstablishmentCreationRoutingComponents, DragDropDirective],
  exports: [],
    imports: [
      CommonModule,
      SharedModule,
      EstablishmentCreationRoutingModuleModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      AngularSvgIconModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyC1h_wenME-_pPs12Sv7OzKd-3id8IbnxM',
        libraries : ['places']
      }),
    ]
})
export class EstablishmentCreationModule {

}
