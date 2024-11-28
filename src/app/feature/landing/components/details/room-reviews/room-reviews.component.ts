import { Component, Input } from '@angular/core';

import { LandingService } from '../../../services/landing.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { RoomReview } from '../../../interfaces/room-review';

@Component({
  selector: 'app-room-reviews',
  templateUrl: './room-reviews.component.html',
  styleUrls: ['./room-reviews.component.scss'],
})
export class RoomReviewsComponent {
  @Input() roomId: string;

  rateValue: number = 0;
  rateText: string;
  reviewsList: RoomReview[];

  userName: string = '';

  isLoggedIn: boolean = false;
  isReviewBefore: boolean;

  constructor(
    private _landing: LandingService,
    private _message: MessageService,
    private _translate: TranslateService
  ) {
    this.isLoggedIn = localStorage.getItem('userToken') ? true : false;
    this.userName = localStorage.getItem('userName') ?? '';
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.getReviews();
    }
  }

  getReviews(): void {
    this._landing.getReviews(this.roomId).subscribe({
      next: ({ data }) => {
        this.reviewsList = data.roomReviews;

        this.reviewsList.forEach(({ user }) => {
          if (user.userName == this.userName) {
            this.isReviewBefore = true;
          }
        });
      },
    });
  }

  onReview(): void {
    if (!this.isLoggedIn) {
      this._message.add({
        severity: 'error',
        summary: this._translate.instant('ERROR_MESSAGES.ERROR_TITLE'),
        detail: this._translate.instant('ERROR_MESSAGES.LOGIN_FIRST'),
      });
    } else if (this.rateValue && this.rateText) {
      const review = {
        roomId: this.roomId,
        rating: this.rateValue,
        review: this.rateText,
      };

      this.addReview(review);
    }
  }

  addReview(review: any): void {
    this._landing.addReview(review).subscribe({
      next: () => {
        this.rateValue = 0;
        this.rateText = '';

        this._message.add({
          severity: 'success',
          summary: this._translate.instant('SUCCESS_MESSAGES.SUCCESS_TITLE'),
          detail: this._translate.instant(
            'SUCCESS_MESSAGES.ADD_REVIEW_SUCCESS'
          ),
        });

        this.getReviews();
      },
    });
  }
}
