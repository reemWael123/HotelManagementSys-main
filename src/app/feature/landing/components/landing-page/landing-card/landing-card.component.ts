import { AdsResponse } from './../../../../dashboard/modules/ads/interfaces/ads-response';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LandingService } from '../../../services/landing.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-landing-card',
  templateUrl: './landing-card.component.html',
  styleUrls: ['./landing-card.component.scss'],
})
export class LandingCardComponent implements OnInit {
  @Output() removeFromFavorites = new EventEmitter();

  // roomId: number = 0;
  @Input() badgeTitle: string;
  @Input() name: string;
  @Input() images: string[];
  @Input() isFloatedFooter: boolean = false;
  @Input() type: string;
  @Input() id: string;
  @Input() isFavorite: boolean = true;

  isLoggedIn: boolean = false;

  constructor(
    private _LandingService: LandingService,
    private MessageService: MessageService
  ) {
    this.isLoggedIn = localStorage.getItem('userToken') ? true : false;
  }

  ngOnInit(): void {}

  addAndRemoveFavourite() {
    if (this.isLoggedIn) {
      if (this.isFavorite == true) {
        this.addToFavourite();
      } else {
        this.removeFromFavourite();
      }
    } else {
      this.MessageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please log in to access this feature!',
      });
    }
  }

  addToFavourite() {
    this._LandingService.addToFavourites(this.id).subscribe({
      next: (data) => {},
      error: () => {},
      complete: () => {
        this.MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Room added to favourites',
        });
      },
    });
  }

  removeFromFavourite() {
    this._LandingService.deleteFromFavourites(this.id).subscribe({
      next: (data) => {},
      error: () => {},
      complete: () => {
        this.removeFromFavorites.emit();

        this.MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Room removed from favourites',
        });
      },
    });
  }
}
