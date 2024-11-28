import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private translate: TranslateService) {}

  setDirection(lang: string): void {
    const rtlLink = document.getElementById('bootstrap-rtl') as HTMLLinkElement;
    if (lang === 'ar') {
      rtlLink.disabled = false;
      document.documentElement.dir = 'rtl';

      localStorage.setItem('language', 'ar');
    } else {
      rtlLink.disabled = true;
      document.documentElement.dir = 'ltr';

      localStorage.setItem('language', 'en');
    }

    this.translate.use(lang);
  }
}
