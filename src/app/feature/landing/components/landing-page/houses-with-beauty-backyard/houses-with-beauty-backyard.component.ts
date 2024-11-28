import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-houses-with-beauty-backyard',
  templateUrl: './houses-with-beauty-backyard.component.html',
  styleUrls: ['./houses-with-beauty-backyard.component.scss'],
})
export class HousesWithBeautyBackyardComponent implements OnInit {
  @Input() roomsList: any[];
  ngOnInit(): void {}
  ngOnChanges() {
  }
}
