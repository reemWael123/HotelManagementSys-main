import { rooms } from './../../constants/rooms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../services/landing.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  pageid: string = '';
  listdetails: any;
  listroomdetails: any;
  images: any[] | undefined;
  facilities: any[] | undefined;

  concat: any;
  position: string = 'bottom';

  responsiveOptions: any[] | undefined;
  constructor(
    private _LandingService: LandingService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.pageid = this._ActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getroomdetails(this.pageid);

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
  }

  getroomdetails(id: string) {
    this._LandingService.getRoomDetails(id).subscribe({
      next: (res) => {
        this.listroomdetails = res;

        this.images = this.listroomdetails.data.room.images;
        this.facilities = this.listroomdetails.data.room.facilities;
      },
    });
  }
  getFacilityIcon(facilityName: string): string {
    switch (facilityName) {
      case 'Pets allowed':
        return 'fa-solid fa-paw';
      case 'pets':
        return 'fa-solid fa-paw';
      case 'Lounges':
        return 'fa-solid fa-couch';
      case 'Dining & Restaurants':
        return 'fa-solid fa-utensils';
      case 'Kitchen':
        return 'fa-solid fa-kitchen-set';
      case 'bathroom6':
        return 'fa-solid fa-toilet';
      case 'Kids area':
        return 'fa-solid fa-gamepad';
      case 'Air conditioner':
        return 'fa-solid fa-fan';
      case 'Free Wi-Fi':
        return 'fa-solid fa-wifi';
      case 'Wifi':
        return 'fa-solid fa-wifi';
      case 'TV and telephone':
        return 'fa-solid fa-tv';
      case 'Cups':
        return 'fa-solid fa-mug-hot';
      case 'Coffee maker':
        return 'fa-solid fa-mug-hot';
      case 'Laundry & ironing':
        return 'fa-solid fa-soap';
      case 'gym':
        return 'fa-solid fa-dumbbell';
      case 'fan':
        return 'fa-solid fa-fan';
      default:
        return 'pi pi-question';
    }
  }
}
