import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DetailsComponent } from './components/details/details.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { ExploreComponent } from './components/explore/explore.component';
import { userGuard } from 'src/app/core/guards/user.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { paymentGuard } from 'src/app/core/guards/payment.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,

    children: [
      { path: '', component: LandingPageComponent },
      { path: 'favourite', component: FavouriteComponent },
      { path: 'favourite/:_id', component: FavouriteComponent },
      { path: 'room/details/:id', component: DetailsComponent },
      {
        path: 'explore',
        component: ExploreComponent,
        // canActivate: [userGuard],
      },
      {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [paymentGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
