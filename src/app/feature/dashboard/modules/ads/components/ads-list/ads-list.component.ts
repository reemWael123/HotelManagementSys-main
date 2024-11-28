import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';
import { TableColumn } from 'src/app/shared/interfaces/table-column';
import { AddAds, Ads } from '../../interfaces/ads';
import { AdsService } from '../../services/ads.service';
import { AddEditAdsComponent } from '../add-edit-ads/add-edit-ads.component';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss'],
  providers: [DialogService],
})
export class AdsListComponent {
  columns: TableColumn[] = [];
  adsList: Ads[] = [];

  addRef: DynamicDialogRef;
  editRef: DynamicDialogRef;

  paginator = true;
  totalRecords: number;
  footerKey = 'ads';

  deleteRef: DynamicDialogRef;

  constructor(
    private _ads: AdsService,
    public _dialog: DialogService,
    public messageService: MessageService
  ) {
    this.columns = this._ads.tableColumns;
  }

  ngOnInit() {
    this.getAdsList();
  }

  getAdsList(): void {
    this._ads.getAds().subscribe({
      next: (res) => {
        this.adsList = res.data.ads;
        this.totalRecords = res.data.totalCount;
      },
    });
  }

  onAdd(): void {
    this.addRef = this._dialog.open(AddEditAdsComponent, {
      data: { text: 'add' },
      header: 'Add Ads',
      style: { minWidth: '35%' },
      contentStyle: { overflow: 'auto' },
    });

    this.addRef.onClose.subscribe((res) => {
      if (res) {
        this.addAds(res);
      }
    });
  }

  addAds(data: any): void {
    this._ads.addAds(data).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ads is added successfully!',
        });
        this.getAdsList();
      },
    });
  }

  onEdit(e: Ads): void {
    this.editRef = this._dialog.open(AddEditAdsComponent, {
      data: {
        text: 'edit',
        ads: {
          room: e.room._id,
          discount: e.room.discount,
          isActive: e.isActive,
        },
      },
      style: { minWidth: '35%' },
      contentStyle: { overflow: 'auto' },
      header: 'Edit Ads',
    });

    this.editRef.onClose.subscribe((res) => {
      if (res) {
        this.editAds(res, e._id);
      }
    });
  }

  onView(e: Ads): void {
    this.editRef = this._dialog.open(AddEditAdsComponent, {
      data: {
        text: 'view',
        ads: {
          room: e.room._id,
          discount: e.room.discount,
          isActive: e.isActive,
        },
      },
      style: { minWidth: '35%' },
      contentStyle: { overflow: 'auto' },
      header: 'View Ads',
    });
  }

  editAds(data: AddAds, id: string): void {
    this._ads.editAds(data, id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ads is updated successfully!',
        });
        this.getAdsList();
      },
    });
  }

  onDelete(e: Ads): void {
    this.deleteRef = this._dialog.open(DeleteItemComponent, {
      data: {
        id: e._id,
        name: 'ads',
      },
      header: '',
    });

    this.deleteRef.onClose.subscribe((id) => {
      if (id) {
        this.deleteAds(id);
      }
    });
  }

  deleteAds(id: string): void {
    this._ads.deleteAds(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ads is deleted successfully!',
        });

        this.getAdsList();
      },
    });
  }
}
