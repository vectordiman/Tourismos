import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagesListComponent } from './admin-messages-list.component';

describe('AdminMessagesListComponent', () => {
  let component: AdminMessagesListComponent;
  let fixture: ComponentFixture<AdminMessagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMessagesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
