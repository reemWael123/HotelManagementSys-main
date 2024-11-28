import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  MenuItem,
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { AppService } from 'src/app/app.service';
import { NavbarService } from 'src/app/feature/dashboard/services/navbar.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';

import { ChangePassword } from 'src/app/feature/dashboard/interfaces/change-password';
import { UserData } from 'src/app/shared/interfaces/userData';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss'],
  providers: [ConfirmationService],
})
export class UserNavbarComponent {
  userProfile: UserData;
  displayDialog: boolean = false;
  items: MenuItem[] | undefined;

  filterForm: FormGroup;
  lang = 'en';
  theme = 'light';
  isDarkTheme: boolean = false;

  languagesOptions: any[] = [
    { label: 'Ar', value: 'ar' },
    { label: 'En', value: 'en' },
  ];

  themesOptions: any[] = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ];

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private userData: UserDataService,
    private messageService: MessageService,
    private _Router: Router,
    private navbarService: NavbarService,
    private translateService: TranslateService,
    private ConfirmationService: ConfirmationService
  ) {
    this.lang = this.translateService.currentLang;
    this.isDarkTheme = localStorage.getItem('theme') === 'dark' ? true : false;
  }

  ngOnInit() {
    this.filterForm = new FormGroup({
      language: new FormControl(this.lang),
      theme: new FormControl(this.theme),
    });

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
        command: () => this.confirmationLogout(),
      },
    ];
  }

  changeLang() {
    if (this.lang === 'ar') {
      localStorage.setItem('language', 'en');
    } else {
      localStorage.setItem('language', 'ar');
    }
    window.location.reload();
  }

  toggleTheme() {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;

    if (this.isDarkTheme) {
      themeLink.href = 'assets/themes/light-mode.scss';
    } else {
      themeLink.href = 'assets/themes/dark-mode.scss';
    }

    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');

    document.documentElement.classList.toggle('theme-switch');
  }

  getProfile() {
    this.userData.getProfile(this.userData.id).subscribe({
      next: (res) => {
        this.userProfile = res;
      },
    });
  }

  showDialog() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
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

  confirmationLogout() {
    this.ConfirmationService.confirm({
      message: 'Are you sure you want to logout ?',
      header: 'Logout',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.logout();
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

  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
