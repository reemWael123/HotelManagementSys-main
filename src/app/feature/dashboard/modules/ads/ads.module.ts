import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './ads.component';
import { AdsListComponent } from './components/ads-list/ads-list.component';
import { AddEditAdsComponent } from './components/add-edit-ads/add-edit-ads.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdsComponent,
    AdsListComponent,
    AddEditAdsComponent
  ],
  imports: [
    CommonModule,
    AdsRoutingModule,
    SharedModule
  ]
})
export class AdsModule { }
