import { TestBed } from '@angular/core/testing';

import { ImagesFilmService } from './images-film.service';

describe('ImagesFilmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagesFilmService = TestBed.get(ImagesFilmService);
    expect(service).toBeTruthy();
  });
});
