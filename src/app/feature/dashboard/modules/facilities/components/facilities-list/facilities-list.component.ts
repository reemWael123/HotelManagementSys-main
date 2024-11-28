import { Component } from '@angular/core';

import { FacilitiesService } from '../../services/facilities.service';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { Facility } from '../../interfaces/facility';
import { TableColumn } from 'src/app/shared/interfaces/table-column';

import { AddEditFacilityComponent } from '../add-edit-facility/add-edit-facility.component';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';

@Component({
  selector: 'app-facilities-list',
  templateUrl: './facilities-list.component.html',
  styleUrls: ['./facilities-list.component.scss'],
  providers: [DialogService],
})
export class FacilitiesListComponent {
  columns: TableColumn[] = [];
  facilitiesList: Facility[] = [];

  paginator = true;
  totalRecords: number;
  footerKey = 'facility';
  rows = 10;

  addRef: DynamicDialogRef;
  editRef: DynamicDialogRef;
  deleteRef: DynamicDialogRef;

  constructor(
    private _facility: FacilitiesService,
    public _dialog: DialogService,
    public messageService: MessageService
  ) {
    this.columns = this._facility.tableColumns;
  }

  ngOnInit() {
    this.getFacilitiesList();
  }

  getFacilitiesList(): void {
    this._facility.getFacilities().subscribe({
      next: ({ data }) => {
        this.facilitiesList = data.facilities;
        this.totalRecords = data.totalCount;
      },
    });
  }

  onAdd(): void {
    this.addRef = this._dialog.open(AddEditFacilityComponent, {
      header: 'Add Facility',
      style: { minWidth: '35%' },
      contentStyle: { overflow: 'auto' },
    });

    this.addRef.onClose.subscribe((name: string) => {
      this.addFacility(name);
    });
  }

  onEdit(e: Facility): void {
    this.editRef = this._dialog.open(AddEditFacilityComponent, {
      data: {
        name: e.name,
        id: e._id,
      },
      style: { minWidth: '35%' },
      contentStyle: { overflow: 'auto' },
      header: 'Edit Facility',
    });

    this.editRef.onClose.subscribe(({ name, id }) => {
      this.editFacility(name, id);
    });
  }

  onDelete(e: Facility): void {
    this.deleteRef = this._dialog.open(DeleteItemComponent, {
      data: {
        id: e._id,
        name: 'facility',
      },
      header: '',
    });

    this.deleteRef.onClose.subscribe((id: any) => {
      this.deleteFacility(id);
    });
  }

  addFacility(name: string): void {
    this._facility.addFacility(name).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Facility is added successfully!',
        });

        this.getFacilitiesList();
      },
    });
  }

  editFacility(name: string, id: string): void {
    this._facility.editFacility(name, id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Facility is updated successfully!',
        });

        this.getFacilitiesList();
      },
    });
  }

  deleteFacility(id: string): void {
    this._facility.deleteFacility(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Facility is deleted successfully!',
        });

        this.getFacilitiesList();
      },
    });
  }
}
