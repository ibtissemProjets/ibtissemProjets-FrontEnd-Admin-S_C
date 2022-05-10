import { TestBed } from '@angular/core/testing';

import { NationaliteService } from './nationalite.service';

describe('NationaliteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NationaliteService = TestBed.get(NationaliteService);
    expect(service).toBeTruthy();
  });
});
