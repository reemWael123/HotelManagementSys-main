import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsLargeRoomsComponent } from './hotels-large-rooms.component';

describe('HotelsLargeRoomsComponent', () => {
  let component: HotelsLargeRoomsComponent;
  let fixture: ComponentFixture<HotelsLargeRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelsLargeRoomsComponent]
    });
    fixture = TestBed.createComponent(HotelsLargeRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
