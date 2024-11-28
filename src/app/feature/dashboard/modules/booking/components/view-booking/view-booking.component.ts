import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserService } from '../../../users/services/user.service';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../interfaces/booking';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.scss'],
})
export class ViewBookingComponent {
  data: any;
  book: any;
  constructor(
    public deleteRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _BookingService: BookingService
  ) {}

  ngOnInit() {
    this.data = this.config?.data;
    this.viewbookbyid(this.data.id);
  }

  viewbookbyid(id: string) {
    this._BookingService.getBookingByID(id).subscribe({
      next: (res) => {
        this.book = res.data.booking;
      },
    });
  }
}
