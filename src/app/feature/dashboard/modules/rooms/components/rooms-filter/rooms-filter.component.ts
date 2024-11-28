import { Component } from '@angular/core';

@Component({
  selector: 'app-rooms-filter',
  templateUrl: './rooms-filter.component.html',
  styleUrls: ['./rooms-filter.component.scss'],
})
export class RoomsFilterComponent {
  filterKeys = [
    {
      label: 'Room number',
      value: 'roomNumber',
    },
  ];
}
