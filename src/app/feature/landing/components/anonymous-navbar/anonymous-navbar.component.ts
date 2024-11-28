import { Component } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anonymous-navbar',
  templateUrl: './anonymous-navbar.component.html',
  styleUrls: ['./anonymous-navbar.component.scss'],
})
export class AnonymousNavbarComponent {
  formGroup: FormGroup;
  lang = 'en';

  stateOptions: any[] = [
    { label: 'Ar', value: 'ar' },
    { label: 'En', value: 'en' },
  ];

  isLoggedIn: boolean = false;

  constructor(
    private translateService: TranslateService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.lang = this.translateService.currentLang;
    this.isLoggedIn = localStorage.getItem('userToken') ? true : false;
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      language: new FormControl(this.lang),
    });
  }

  changeLang() {
    if (this.lang === 'ar') {
      localStorage.setItem('language', 'en');
    } else {
      localStorage.setItem('language', 'ar');
    }
    window.location.reload();
  }

  openExplore() {
    // if (this.isLoggedIn) {
      this.router.navigate(['/landing/explore']);
    // } else {
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: 'Please log in to access this feature!',
    //   });
    // }
  }
}
