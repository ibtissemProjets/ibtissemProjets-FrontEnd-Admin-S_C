import { TestBed } from '@angular/core/testing';

import { CarousselService } from './caroussel.service';

describe('CarousselService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarousselService = TestBed.get(CarousselService);
    expect(service).toBeTruthy();
  });
});
