import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPhotoEditorComponent } from './tour-photo-editor.component';

describe('TourPhotoEditorComponent', () => {
  let component: TourPhotoEditorComponent;
  let fixture: ComponentFixture<TourPhotoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourPhotoEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPhotoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
