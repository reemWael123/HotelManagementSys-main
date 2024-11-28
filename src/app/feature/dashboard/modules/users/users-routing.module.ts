import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './components/user-list/user-list.component';
import { ViewuserComponent } from './components/viewuser/viewuser.component';
import { UsersComponent } from './users.component';

const routes: Routes = [{ path: '', component:UsersComponent,
  children:[

    {path:'',redirectTo:"userlist",pathMatch:'full'},
    {path:'userlist',component:UserListComponent},
    {
      path:'view/:id',component:ViewuserComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
