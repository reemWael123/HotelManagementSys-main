import { Component, Input } from '@angular/core';

import { Advertisment } from '../../../interfaces/advertisment';

@Component({
  selector: 'app-most-popular-ads',
  templateUrl: './most-popular-ads.component.html',
  styleUrls: ['./most-popular-ads.component.scss'],
})
export class MostPopularAdsComponent {
  @Input() adsList: any[];
}
