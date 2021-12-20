import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertMessagesListComponent } from './expert-messages-list.component';

describe('ExpertMessagesListComponent', () => {
  let component: ExpertMessagesListComponent;
  let fixture: ComponentFixture<ExpertMessagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertMessagesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
