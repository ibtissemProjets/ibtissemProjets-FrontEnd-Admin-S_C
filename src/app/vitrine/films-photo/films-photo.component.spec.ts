import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsPhotoComponent } from './films-photo.component';

describe('FilmsPhotoComponent', () => {
  let component: FilmsPhotoComponent;
  let fixture: ComponentFixture<FilmsPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmsPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
