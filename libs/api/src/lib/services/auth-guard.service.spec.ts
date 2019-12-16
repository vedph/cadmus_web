/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';

describe('Service: AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ });
  });

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
