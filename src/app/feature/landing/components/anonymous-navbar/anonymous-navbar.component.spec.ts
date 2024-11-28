import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousNavbarComponent } from './anonymous-navbar.component';

describe('AnonymousNavbarComponent', () => {
  let component: AnonymousNavbarComponent;
  let fixture: ComponentFixture<AnonymousNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnonymousNavbarComponent]
    });
    fixture = TestBed.createComponent(AnonymousNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
