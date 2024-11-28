import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss'],
})
export class ViewuserComponent implements OnInit {
  pageid: string = '';
  user: any;
  constructor(
    private _UserService: UserService,
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.pageid = this._ActivatedRoute.snapshot.params['id'];
  }
  userForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    role: new FormControl([], [Validators.required]),
  });

  ngOnInit(): void {
    this.viewuser(this.pageid);
    this.userForm.disable();
  }
  viewuser(id: string) {
    this._UserService.getUserByID(id).subscribe({
      next: (res) => {
        this.user = res.data.user;
      },
      complete: () => {
        this.userForm.patchValue({
          userName: this.user.userName,
          email: this.user.email,
          country: this.user.country,
          role: this.user.role,
          phoneNumber: this.user.phoneNumber,
        });
      },
    });
  }
  Back() {
    this._router.navigate(['/dashboard/users/userlist']);
  }
}
