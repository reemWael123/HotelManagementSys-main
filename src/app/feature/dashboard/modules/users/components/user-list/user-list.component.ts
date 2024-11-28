import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TableColumn } from 'src/app/shared/interfaces/table-column';
import { UserService } from '../../services/user.service';
import { Room } from '../../../rooms/interfaces/room';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

    columns: TableColumn[] = [];
    userList: any;
  
    paginator = true;
    totalRecords: number;
    footerKey = 'users';
  
  
  
    constructor(
      private _UserService: UserService,
      private _router: Router,
    
      public messageService: MessageService
    ) {
      this.columns = this._UserService.tableColumns;
    }
  
    ngOnInit() {
      this.getuserList();
    }
  
    getuserList(): void {
      this._UserService.getUserList().subscribe({
        next: ({ data }) => {
          this.userList = data.users;
          this.totalRecords = data.totalCount;
        },
      });
    }
    onView(e:Room): void {
      this._router.navigateByUrl('dashboard/users/view/' + e._id);
   
    }

  
  
  
}
