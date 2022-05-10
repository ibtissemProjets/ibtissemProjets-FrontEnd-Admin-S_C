import { TestBed } from '@angular/core/testing';

import { Authentication.ServiceService } from './authentication.service.service';

describe('Authentication.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Authentication.ServiceService = TestBed.get(Authentication.ServiceService);
    expect(service).toBeTruthy();
  });
});
