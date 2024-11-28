import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
  data: { rating: number; userName: string; review: string }[] = [
    {
      rating: +this.translate.instant('reviews.rating1'),
      userName: this.translate.instant('reviews.userName1'),
      review: this.translate.instant('reviews.review1'),
    },
    {
      rating: +this.translate.instant('reviews.rating2'),
      userName: this.translate.instant('reviews.userName2'),
      review: this.translate.instant('reviews.review2'),
    },
    {
      rating: +this.translate.instant('reviews.rating13'),
      userName: this.translate.instant('reviews.userName3'),
      review: this.translate.instant('reviews.review3'),
    },
    {
      rating: +this.translate.instant('reviews.rating4'),
      userName: this.translate.instant('reviews.userName4'),
      review: this.translate.instant('reviews.review4'),
    },
    {
      rating: +this.translate.instant('reviews.rating5'),
      userName: this.translate.instant('reviews.userName5'),
      review: this.translate.instant('reviews.review5'),
    },
  ];
  responsiveOptions: any[];

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
