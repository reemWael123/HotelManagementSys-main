import { Component } from '@angular/core';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-edit-facility',
  templateUrl: './add-edit-facility.component.html',
  styleUrls: ['./add-edit-facility.component.scss'],
})
export class AddEditFacilityComponent {
  data: { name: string; id?: string };

  name: string;

  loading = false;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.data = this.config?.data;

    if (this.data?.id) {
      this.name = this.data.name;
    }
  }

  submit(): void {
    // If edit facility, send also its id
    if (this.data?.id) {
      this.dialogRef.close({ name: this.name, id: this.data.id });
    } else {
      this.dialogRef.close(this.name);
    }
  }
}
