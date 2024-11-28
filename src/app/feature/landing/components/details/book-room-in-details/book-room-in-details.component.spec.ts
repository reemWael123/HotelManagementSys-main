import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRoomInDetailsComponent } from './book-room-in-details.component';

describe('BookRoomInDetailsComponent', () => {
  let component: BookRoomInDetailsComponent;
  let fixture: ComponentFixture<BookRoomInDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookRoomInDetailsComponent]
    });
    fixture = TestBed.createComponent(BookRoomInDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
