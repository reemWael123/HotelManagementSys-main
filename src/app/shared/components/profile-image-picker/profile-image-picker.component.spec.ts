import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImagePickerComponent } from './profile-image-picker.component';

describe('ProfileImagePickerComponent', () => {
  let component: ProfileImagePickerComponent;
  let fixture: ComponentFixture<ProfileImagePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileImagePickerComponent]
    });
    fixture = TestBed.createComponent(ProfileImagePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
