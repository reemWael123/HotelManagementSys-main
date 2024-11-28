import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TableColumn } from 'src/app/shared/interfaces/table-column';
import { GetBookingList } from '../interfaces/get-booking-list';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private _HttpClient: HttpClient) {}
  bookingBaseUrl = 'admin/booking';

  get tableColumns(): TableColumn[] {
    return [
      {
        type: 'object',
        header: 'Room number',
        field: 'room',
        objectKey: 'roomNumber',
      },
      {
        type: 'number',
        header: 'Price',
        field: 'totalPrice',
        decimalPlaces: 0,
      },
      {
        type: 'date',
        header: 'Start Date',
        field: 'startDate',
        format: 'dd/MM/yyyy',
      },
      {
        type: 'date',
        header: 'End Date',
        field: 'endDate',
        format: 'dd/MM/yyyy',
      },
      {
        type: 'object',
        header: 'User',
        field: 'user',
        objectKey: 'userName',
      },
      {
        type: 'actions',
        header: 'Actions',
        field: 'actions',
        actions: {
          isView: true,
          isEdit: false,
          isDelete: true,
        },
        isFrozen: true,
        frozenDirection: 'right',
      },
    ];
  }

  getBookingList(): Observable<GetBookingList> {
    return this._HttpClient.get<GetBookingList>(
      this.bookingBaseUrl + '?page=1&size=1000000'
    );
  }

  getBookingByID(id: string): Observable<any> {
    return this._HttpClient.get(this.bookingBaseUrl + '/' + id);
  }

  deleteBooking(id: string): Observable<any> {
    return this._HttpClient.delete(this.bookingBaseUrl + '/' + id);
  }
}
