import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookingProcessRoutingComponents, BookingProcessRoutingModule} from './booking-process-routing.module';
import {SharedModule} from '../mdl-shared/shared.module';



@NgModule({
  declarations: [BookingProcessRoutingComponents],
  imports: [
      SharedModule,
      CommonModule,
      BookingProcessRoutingModule
  ]
})
export class BookingProcessModule { }
