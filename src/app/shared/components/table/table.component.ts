import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableService } from '../../services/table.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { TableColumn } from '../../interfaces/table-column';

import { environment } from 'src/app/core/environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Output() viewEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();

  @Input() columns: TableColumn[];
  @Input() data: any[];

  @Input() paginator: boolean;
  @Input() rows: number = 5;
  @Input() showCurrentPageReport: boolean = true;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
  @Input() footerKey: string;
  @Input() totalRecords: number;
  @Input() pageLinks: number = 3;
  @Input() frozenColumns = [];
  @Input() styleClass: string = 'p-datatable-sm';

  currentPageReportTemplate = 'Showing {first} to {last} of {totalRecords}';

  imageUrl: string;
  showGallery: boolean = false;
  galleryImages: any[] = [];

  ref: DynamicDialogRef;

  constructor(private _table: TableService) {
    this.imageUrl = environment.imageUrl;
  }

  ngOnInit(): void {
    this.currentPageReportTemplate =
      this.currentPageReportTemplate + ' ' + this.footerKey;
  }

  onView(e: any): void {
    this.viewEmitter.emit(e);
  }

  onEdit(e: any): void {
    this.editEmitter.emit(e);
  }

  onDelete(id: number): void {
    this.deleteEmitter.emit(id);
  }

  getColumnAvatars(rowImages: string | Array<any>): any[] {
    return this._table.getColumnAvatars(rowImages);
  }

  openGallery(images: any[]): void {
    this.galleryImages = images;

    this.showGallery = true;
  }

  exitGallery(): void {
    this.showGallery = false;
  }
}
