import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { RoomService } from '../../services/room.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { TableColumn } from 'src/app/shared/interfaces/table-column';
import { Room } from '../../interfaces/room';

import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  providers: [DialogService],
})
export class RoomsListComponent {
  columns: TableColumn[] = [];
  roomsList: Room[] = [];

  paginator = true;
  totalRecords: number;
  footerKey = 'rooms';

  deleteRef: DynamicDialogRef;

  constructor(
    private _room: RoomService,
    private _router: Router,
    public _dialog: DialogService,
    public messageService: MessageService
  ) {
    this.columns = this._room.tableColumns;
  }

  ngOnInit() {
    this.getRoomsList();
  }

  getRoomsList(): void {
    this._room.getRoomsList().subscribe({
      next: ({ data }) => {
        this.roomsList = data.rooms;
        this.totalRecords = data.totalCount;
      },
    });
  }

  addRoom(): void {
    this._router.navigateByUrl('dashboard/rooms/add');
  }

  onView(e: Room): void {
    this._router.navigateByUrl('dashboard/rooms/view/' + e._id);
  }

  onEdit(e: Room): void {
    this._router.navigateByUrl('dashboard/rooms/edit/' + e._id);
  }

  onDelete(e: Room): void {
    this.deleteRef = this._dialog.open(DeleteItemComponent, {
      data: {
        id: e._id,
        name: 'room',
      },
      header: '',
    });

    this.deleteRef.onClose.subscribe((id) => {
      if (id) {
        this.deleteRoom(id);
      }
    });
  }

  deleteRoom(id: string): void {
    this._room.deleteRoom(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Room is deleted successfully!',
        });

        this.getRoomsList();
      },
    });
  }
}
