import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  lang: any;
  title = 'HotelManagementSys';

  constructor(private translate: TranslateService, private _app: AppService) {
    if ('language' in localStorage) {
      this.lang = localStorage.getItem('language');
      this.translate.use(this.lang);
    } else {
      this.translate.use(this.translate.defaultLang);
    }
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this._app.setDirection(event.lang);
    });
  }
}
