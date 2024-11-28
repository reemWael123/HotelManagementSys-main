import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { TableColumn } from 'src/app/shared/interfaces/table-column';
import { Room } from '../rooms/interfaces/room';
import { RoomService } from '../rooms/services/room.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  // columns: TableColumn[] = [];
  // userList: any;

  // paginator = true;
  // totalRecords: number;
  // footerKey = 'users';



  // constructor(
  //   private _UserService: UserService,
  //   private _router: Router,
  
  //   public messageService: MessageService
  // ) {
  //   this.columns = this._UserService.tableColumns;
  // }

  // ngOnInit() {
  //   this.getuserList();
  // }

  // getuserList(): void {
  //   this._UserService.getUserList().subscribe({
  //     next: ({ data }) => {
  //       this.userList = data.users;
  //       this.totalRecords = data.totalCount;
  //     },
  //   });
  // }

}
