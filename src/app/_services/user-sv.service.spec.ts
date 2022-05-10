import { TestBed } from '@angular/core/testing';

import { UserSvService } from './user-sv.service';

describe('UserSvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSvService = TestBed.get(UserSvService);
    expect(service).toBeTruthy();
  });
});
