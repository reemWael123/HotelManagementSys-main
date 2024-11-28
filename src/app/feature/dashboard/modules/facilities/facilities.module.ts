import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilitiesRoutingModule } from './facilities-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { FacilitiesComponent } from './facilities.component';
import { FacilitiesListComponent } from './components/facilities-list/facilities-list.component';
import { AddEditFacilityComponent } from './components/add-edit-facility/add-edit-facility.component';

@NgModule({
  declarations: [FacilitiesComponent, FacilitiesListComponent, AddEditFacilityComponent],
  imports: [CommonModule, FacilitiesRoutingModule, SharedModule],
})
export class FacilitiesModule {}
