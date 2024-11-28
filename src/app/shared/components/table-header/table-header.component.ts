import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent {
  @Output() addEmitter = new EventEmitter();

  @Input() title: string;
  @Input() buttonText: string;

  onAdd(): void {
    this.addEmitter.emit();
  }
}
