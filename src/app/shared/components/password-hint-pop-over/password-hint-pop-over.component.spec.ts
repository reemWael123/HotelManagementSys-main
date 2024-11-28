import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordHintPopOverComponent } from './password-hint-pop-over.component';

describe('PasswordHintPopOverComponent', () => {
  let component: PasswordHintPopOverComponent;
  let fixture: ComponentFixture<PasswordHintPopOverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordHintPopOverComponent]
    });
    fixture = TestBed.createComponent(PasswordHintPopOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
