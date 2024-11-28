import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { NavbarService } from '../../services/navbar.service';

import { UserData } from 'src/app/shared/interfaces/userData';
import { ChangePassword } from './../../interfaces/change-password';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [ConfirmationService],
})
export class NavbarComponent {
  userProfile: UserData;
  items: MenuItem[] | undefined;
  visible: boolean;
  displayDialog: boolean = false;
  value: string;

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private messageService: MessageService,
    private ConfirmationService: ConfirmationService,
    private userData: UserDataService,
    private _Router: Router,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.getProfile();
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user-edit',
      },
      {
        label: 'Change password',
        icon: 'pi pi-fw pi-unlock',
        command: () => this.showDialog(), // Show dialog on click
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.confirmationLogout();
        },
      },
    ];
  }

  getProfile() {
    this.userData.getProfile(this.userData.id).subscribe({
      next: (res) => {
        this.userProfile = res;
      },
    });
  }

  logOut() {
    localStorage.clear();
    this._Router.navigate(['/landing']);
  }

  showDialog() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  confirmationLogout() {
    this.ConfirmationService.confirm({
      message: 'Are you sure you want to logout ?',
      header: 'Logout',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.logOut();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      },
    });
  }

  changePassword() {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.valid) {
      this.navbarService
        .changePassword(this.changePasswordForm.value as ChangePassword)
        .subscribe({
          complete: () => {
            this.hideDialog();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Password changed successfully!',
            });
            this._Router.navigate(['/dashboard']);
          },
        });
    }
  }
}
