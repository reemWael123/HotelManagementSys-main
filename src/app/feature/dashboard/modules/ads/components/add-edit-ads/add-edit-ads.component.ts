import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoomService } from '../../../rooms/services/room.service';
import { Room } from '../../../rooms/interfaces/room';

@Component({
  selector: 'app-add-edit-ads',
  templateUrl: './add-edit-ads.component.html',
  styleUrls: ['./add-edit-ads.component.scss'],
})
export class AddEditAdsComponent {
  data: {
    text: string;
    ads: {
      room: string;
      discount: number;
      isActive: boolean;
    };
  };

  room: string;
  discount: number;
  isActive: boolean;

  facilitiesDropDown: Room[] = [];
  statusDropDown = [
    { id: true, name: 'Active' },
    { id: false, name: 'Not Active' },
  ];
  loading = false;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _room: RoomService
  ) {}

  ngOnInit() {
    this.data = this.config?.data;
    if (this.data.ads) {
      this.room = this.data.ads.room;
      this.discount = this.data.ads.discount;
      this.isActive = this.data.ads.isActive;
    }
    this.getRoomRooms();
  }

  submit(): void {
    if (this.data.text === 'edit') {
      this.dialogRef.close({
        discount: this.discount,
        isActive: this.isActive,
      });
    } else {
      this.dialogRef.close({
        room: this.room,
        discount: this.discount,
        isActive: this.isActive,
      });
    }
  }

  getRoomRooms(): void {
    this._room.getRoomsList().subscribe({
      next: ({ data }) => {
        this.facilitiesDropDown = data.rooms;
      },
      error: () => {},
    });
  }
}
