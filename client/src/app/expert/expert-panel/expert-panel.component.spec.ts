import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertPanelComponent } from './expert-panel.component';

describe('ExpertPanelComponent', () => {
  let component: ExpertPanelComponent;
  let fixture: ComponentFixture<ExpertPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
