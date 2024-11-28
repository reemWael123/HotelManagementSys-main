import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  isAnonymousUser: boolean;

  ngOnInit() {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('role');

    if (token && role !== 'admin') {
      this.isAnonymousUser = false;
    } else {
      this.isAnonymousUser = true;
    }
  }
}
