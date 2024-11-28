import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAdsComponent } from './add-edit-ads.component';

describe('AddEditAdsComponent', () => {
  let component: AddEditAdsComponent;
  let fixture: ComponentFixture<AddEditAdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditAdsComponent]
    });
    fixture = TestBed.createComponent(AddEditAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
