import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewuserComponent } from './components/viewuser/viewuser.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    ViewuserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
   SharedModule
  ]
})
export class UsersModule { }
