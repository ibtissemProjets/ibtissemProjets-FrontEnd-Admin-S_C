import { TestBed } from '@angular/core/testing';

import { TestfilmService } from './testfilm.service';

describe('TestfilmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestfilmService = TestBed.get(TestfilmService);
    expect(service).toBeTruthy();
  });
});
