import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { DataSharingService } from '../../../services/data-sharing.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  rangeDates: any[];
  capacity: number = 1;
  isLoggedIn: boolean = false;
  today = new Date();
  
  constructor(
    public _translate: TranslateService,
    private dataSharingService: DataSharingService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.isLoggedIn = localStorage.getItem('userToken') ? true : false;
  }

  decrementCapacity(): void {
    if (this.capacity > 1) {
      this.capacity--;
    }
  }

  incrementCapacity(): void {
    this.capacity++;
  }

  sendData() {
    if (this.isLoggedIn) {
      if (
        this.capacity &&
        this.rangeDates &&
        this.rangeDates[0] != null &&
        this.rangeDates[1] != null
      ) {
        const startDate = this.rangeDates[0]?.toISOString().split('T')[0];
        const endDate = this.rangeDates[1]?.toISOString().split('T')[0];

        const dataToSend = {
          startDate: startDate || '',
          endDate: endDate || '',
          capacity: this.capacity,
        };
        this.dataSharingService.changeData(dataToSend);
        this.router.navigate(['/landing/explore']);
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
