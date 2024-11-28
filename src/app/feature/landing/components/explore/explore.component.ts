import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LandingService } from '../../services/landing.service';
import { GetRoomsListResponse } from 'src/app/feature/dashboard/modules/rooms/interfaces/get-rooms-list-response';
import { DataSharingService } from '../../services/data-sharing.service';
import { TranslateService } from '@ngx-translate/core';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent {
  roomData!: GetRoomsListResponse;

  roomsList: any[];

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  first: number = 0;

  rows: number = 6;

  receivedData: any;

  constructor(
    private _landing: LandingService,
    private dataSharingService: DataSharingService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.dataSharingService.currentData.subscribe((data) => {
      this.receivedData = data;
    });
    this.items = [{ label: this.translate.instant('NAVBAR.EXPLORE') }];
    this.home = {
      label: this.translate.instant('NAVBAR.HOME'),
      icon: 'pi pi-home',
      routerLink: '/landing',
    };
    this.getRooms(0, this.rows); //PrimeNG pages start at 0, backend pages start at 1
  }

  getRooms(page: number, rows: number): void {
    const pageNumber = page + 1;
    if (this.receivedData) {

      this.receivedData = {
        ...this.receivedData,
        page: pageNumber,
        size: rows,
      };
      this._landing.getRoomsExploreFilter(this.receivedData).subscribe({
        next: (res) => {
          this.roomData = res;
          this.roomsList = res.data.rooms;
        },
      });
    } else {
      this._landing.getRoomsExplore(pageNumber, rows).subscribe({
        next: (res) => {
          this.roomData = res;
          this.roomsList = res.data.rooms;
        },
      });
    }
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    const currentPage = event.page;
    this.getRooms(currentPage, this.rows);
  }
}
