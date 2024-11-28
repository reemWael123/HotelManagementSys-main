import { PaginatorModule } from 'primeng/paginator';
import { rooms } from './../../constants/rooms';
import { RoomService } from 'src/app/feature/dashboard/modules/rooms/services/room.service';
import { LandingService } from './../../services/landing.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {
  roomsList: any[] = [];
  roomsData: any;
  first: number = 0;
  rows: number = 6;
  totalPages: number = 0;

  constructor(private _LandingService: LandingService) {}

  ngOnInit(): void {
    this.getFavouriteRooms(0, this.rows);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    const currentPage = event.page;
    this.getFavouriteRooms(currentPage, this.rows);
  }

  getFavouriteRooms(page: number, rows: number) {
    const pageNumber = page + 1;
    this._LandingService
      .getFavouriteRooms({ page: pageNumber, size: rows })
      .subscribe({
        next: (data) => {
          this.roomsData = data;
          this.roomsList = this.roomsData.data.favoriteRooms[0].rooms;
          this.totalPages = this.roomsList.length;
        },
      });
  }
}
