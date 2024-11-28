import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggler: boolean = false;

  sendData() {
    this.toggler = !this.toggler;
    this.toggle.emit(this.toggler);
  }

  menu: any = [
    {
      title: 'Insights',
      icon: 'pi-home',
      link: '/dashboard/insights',
    },
    {
      title: 'Users',
      icon: 'pi-users',
      link: '/dashboard/users',
    },
    {
      title: 'Rooms',
      icon: 'pi-th-large',
      link: '/dashboard/rooms/list',
    },
    {
      title: 'ADS',
      icon: 'pi-calendar-minus',
      link: '/dashboard/ads',
    },
    {
      title: 'Facilities',
      icon: 'pi-book',
      link: '/dashboard/facilities',
    },
    {
      title: 'Bookings',
      icon: 'pi-money-bill',
      link: '/dashboard/bookings',
    },
  ];

  ngOnInit() {}
}
