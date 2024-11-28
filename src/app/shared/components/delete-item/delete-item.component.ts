import { Component, EventEmitter, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss'],
})
export class DeleteItemComponent {
  data: any;

  constructor(
    public deleteRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.data = this.config?.data;
  }

  onDelete(): void {
    this.deleteRef.close(this.data.id);
  }
}
