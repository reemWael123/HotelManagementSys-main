import { Component, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Room } from 'src/app/feature/dashboard/modules/rooms/interfaces/room';
import { PaymentService } from './../../../services/payment.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-room-in-details',
  templateUrl: './book-room-in-details.component.html',
  styleUrls: ['./book-room-in-details.component.scss'],
})
export class BookRoomInDetailsComponent {
  @Input() room: any;

  rangeDates: any[];

  isLoggedIn: boolean = false;

  today = new Date();

  constructor(
    public _translate: TranslateService,
    private paymentService: PaymentService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.isLoggedIn = localStorage.getItem('userToken') ? true : false;
  }

  onSubmit() {
    if (this.isLoggedIn) {
      if (
        this.rangeDates &&
        this.rangeDates[0] != null &&
        this.rangeDates[1] != null
      ) {
        const startDate = this.rangeDates[0]?.toISOString().split('T')[0];
        const endDate = this.rangeDates[1]?.toISOString().split('T')[0];

        const dataToSend = {
          startDate: startDate || '',
          endDate: endDate || '',
          room: this.room._id,
          totalPrice: this.room.price,
        };
        this.paymentService.createBooking(dataToSend).subscribe({
          next: (res) => {
            if (res.success === true) {
              this.router.navigate(['/landing/payment']);
              this.paymentService.id = res.data.booking._id;
              this.paymentService.price = this.room.price;
            }
          },
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please select a valid date range to proceed!',
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please log in to access this feature!',
      });
    }
  }
}
