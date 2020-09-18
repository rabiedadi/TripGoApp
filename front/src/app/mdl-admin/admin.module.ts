import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingComponents, AdminRoutingModule} from './admin-routing.module';
import {SharedModule} from '../mdl-shared/shared.module';
import { ReservationComponent } from './tabs/reservation/reservation.component';
import { CalendarComponent } from './tabs/calendar/calendar.component';
import { ReviewsComponent } from './tabs/reviews/reviews.component';



@NgModule({
  declarations: [AdminRoutingComponents, ReservationComponent, CalendarComponent, ReviewsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
