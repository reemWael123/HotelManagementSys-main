import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hotels-large-rooms',
  templateUrl: './hotels-large-rooms.component.html',
  styleUrls: ['./hotels-large-rooms.component.scss'],
})
export class HotelsLargeRoomsComponent {
  @Input() roomsList: any[];
}
