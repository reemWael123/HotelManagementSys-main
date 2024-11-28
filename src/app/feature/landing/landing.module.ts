import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { LandingComponent } from './landing.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { AnonymousNavbarComponent } from './components/anonymous-navbar/anonymous-navbar.component';
import { MostPopularAdsComponent } from './components/landing-page/most-popular-ads/most-popular-ads.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LandingCardComponent } from './components/landing-page/landing-card/landing-card.component';
import { HousesWithBeautyBackyardComponent } from './components/landing-page/houses-with-beauty-backyard/houses-with-beauty-backyard.component';
import { HotelsLargeRoomsComponent } from './components/landing-page/hotels-large-rooms/hotels-large-rooms.component';
import { BannerComponent } from './components/landing-page/banner/banner.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { DetailsComponent } from './components/details/details.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { RoomReviewsComponent } from './components/details/room-reviews/room-reviews.component';
import { RoomCommentsComponent } from './components/details/room-comments/room-comments.component';
import { BookRoomInDetailsComponent } from './components/details/book-room-in-details/book-room-in-details.component';
import { ExploreComponent } from './components/explore/explore.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { SuccessPaymentComponent } from './components/payment/success-payment/success-payment.component';
@NgModule({
  declarations: [
    LandingComponent,
    UserNavbarComponent,
    AnonymousNavbarComponent,
    ReviewsComponent,
    MostPopularAdsComponent,
    LandingPageComponent,
    LandingCardComponent,
    HousesWithBeautyBackyardComponent,
    HotelsLargeRoomsComponent,
    BannerComponent,
    DetailsComponent,
    FavouriteComponent,
    RoomReviewsComponent,
    RoomCommentsComponent,
    BookRoomInDetailsComponent,
    ExploreComponent,
    FooterComponent,
    PaymentComponent,
    SuccessPaymentComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    NgxStripeModule.forRoot(
      'pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8'
    ),
  ],
})
export class LandingModule {}
