import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { BookingService } from '../../services/booking.service';

import { TableColumn } from 'src/app/shared/interfaces/table-column';
import { Booking } from '../../interfaces/booking';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';
import { ViewBookingComponent } from '../view-booking/view-booking.component';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  providers: [DialogService],
})
export class BookingListComponent {
  columns: TableColumn[] = [];
  bookingList: Booking[] = [];

  paginator = true;
  totalRecords: number;
  footerKey = 'bookings';

  viewRef: DynamicDialogRef;
  deleteRef: DynamicDialogRef;
  book: any;
  constructor(
    private _booking: BookingService,
    public _dialog: DialogService,
    public messageService: MessageService,
    public _BookingService: BookingService
  ) {
    this.columns = this._booking.tableColumns;
  }

  ngOnInit() {
    this.getBookingList();
  }

  getBookingList(): void {
    this._booking.getBookingList().subscribe({
      next: ({ data }) => {
        this.bookingList = data.booking;
        this.totalRecords = data.totalCount;
      },
    });
  }

  onView(e: Booking): void {
    this.viewRef = this._dialog.open(ViewBookingComponent, {
      data: {
        id: e._id,
      },
      header: '',
    });

    // this.viewRef.onClose.subscribe((id) => {
    //   if (id) {
    //     this.viewbookbyid(id);
    //   }
    // });
  }

  onDelete(e: Booking): void {
    this.deleteRef = this._dialog.open(DeleteItemComponent, {
      data: {
        id: e._id,
        name: 'booking',
      },
      header: '',
    });

    this.deleteRef.onClose.subscribe((id) => {
      if (id) {
        this.deletebooking(id);
      }
    });
  }

  deletebooking(id: string): void {
    this._BookingService.deleteBooking(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'booking is deleted successfully!',
          });
          this.getBookingList();
        }
      },
    });
  }
}
