import {SearchResultRoutingComponents, SearchResultRoutingModule} from './search-result-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../mdl-shared/shared.module';
import {AgmCoreModule} from '@agm/core';
import {RouterModule} from '@angular/router';
import {LightboxModule} from '@ngx-gallery/lightbox';
import {GalleryModule} from '@ngx-gallery/core';
import {AngularSvgIconModule} from 'angular-svg-icon';

@NgModule({
  declarations: [SearchResultRoutingComponents],
  imports: [
    CommonModule,
    SharedModule,
    SearchResultRoutingModule,
    RouterModule,
    GalleryModule,
    LightboxModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1h_wenME-_pPs12Sv7OzKd-3id8IbnxM'
    }),
    AngularSvgIconModule,
  ]
})
export class SearchResultModule { }
