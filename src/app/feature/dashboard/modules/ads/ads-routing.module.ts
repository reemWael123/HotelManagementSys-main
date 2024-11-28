import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsComponent } from './ads.component';
import { AdsListComponent } from './components/ads-list/ads-list.component';
import { AddEditAdsComponent } from './components/add-edit-ads/add-edit-ads.component';

const routes: Routes = [
  {
    path: '',
    component: AdsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: AdsListComponent,
      },
      {
        path: 'add',
        component: AddEditAdsComponent,
      },
      {
        path: 'edit/:id',
        component: AddEditAdsComponent,
      },
      {
        path: 'view/:id',
        component: AddEditAdsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdsRoutingModule {}
