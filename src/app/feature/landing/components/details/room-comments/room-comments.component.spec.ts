import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCommentsComponent } from './room-comments.component';

describe('RoomCommentsComponent', () => {
  let component: RoomCommentsComponent;
  let fixture: ComponentFixture<RoomCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomCommentsComponent]
    });
    fixture = TestBed.createComponent(RoomCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
