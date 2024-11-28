import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFacilityComponent } from './add-edit-facility.component';

describe('AddEditFacilityComponent', () => {
  let component: AddEditFacilityComponent;
  let fixture: ComponentFixture<AddEditFacilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditFacilityComponent]
    });
    fixture = TestBed.createComponent(AddEditFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
