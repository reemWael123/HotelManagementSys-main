import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableColumn } from 'src/app/shared/interfaces/table-column';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient:HttpClient) { }
  UsersBaseUrl = 'admin/users';

  get tableColumns(): TableColumn[] {
    return [
      {
        type: 'text',
        header: 'User name',
        field: 'userName',
      },
      {
        type: 'text',
        header: 'Email',
        field: 'email',
     
      },
      {
        type: 'text',
        header: 'Phone number',
        field: 'phoneNumber',
   
      },  
       {
        type: 'text',
        header: 'Country',
        field: 'country',
   
      },
      {
        type: 'text',
        header: 'Role',
        field: 'role',
   
      },
      
      {
        type: 'images',
        header: 'Image',
        field: 'profileImage',
   
      },
      {
        type: 'actions',
        header: 'Actions',
        field: 'actions',
        actions: {
          isView: true,
          isEdit: false,
          isDelete: false,
        },
        isFrozen: true,
        frozenDirection: 'right',
      },
    ];
  }
  getUserList(): Observable<any> {
    return this._HttpClient.get(
      this.UsersBaseUrl +'?page=1&size=1000000'
    );
  }
  getUserByID(id:string): Observable<any> {
    return this._HttpClient.get(
      this.UsersBaseUrl +'/'+id
    );
  }
}
