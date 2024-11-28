import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingRoutingModule } from './booking-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { BookingComponent } from './booking.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { ViewBookingComponent } from './components/view-booking/view-booking.component';


@NgModule({
  declarations: [BookingComponent, BookingListComponent, ViewBookingComponent],
  imports: [CommonModule, BookingRoutingModule, SharedModule],
})
export class BookingModule {}
