import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesWithBeautyBackyardComponent } from './houses-with-beauty-backyard.component';

describe('HousesWithBeautyBackyardComponent', () => {
  let component: HousesWithBeautyBackyardComponent;
  let fixture: ComponentFixture<HousesWithBeautyBackyardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HousesWithBeautyBackyardComponent]
    });
    fixture = TestBed.createComponent(HousesWithBeautyBackyardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
