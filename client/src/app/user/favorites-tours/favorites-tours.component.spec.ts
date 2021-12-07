import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesToursComponent } from './favorites-tours.component';

describe('FavoritesToursComponent', () => {
  let component: FavoritesToursComponent;
  let fixture: ComponentFixture<FavoritesToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesToursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
