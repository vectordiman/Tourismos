import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMessagesListComponent } from './user-messages-list.component';

describe('UserMessagesListComponent', () => {
  let component: UserMessagesListComponent;
  let fixture: ComponentFixture<UserMessagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMessagesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
