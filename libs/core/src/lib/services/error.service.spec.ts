import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const service = TestBed.get(ErrorService);
    expect(service).toBeTruthy();
  });
});
