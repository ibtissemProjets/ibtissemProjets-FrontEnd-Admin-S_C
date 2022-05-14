import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarousselPhotoComponent } from './caroussel-photo.component';

describe('CarousselPhotoComponent', () => {
  let component: CarousselPhotoComponent;
  let fixture: ComponentFixture<CarousselPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarousselPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarousselPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
