import { TestBed } from '@angular/core/testing';

import { OperatorGuardService } from './operator-guard.service';

describe('OperatorGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperatorGuardService = TestBed.get(OperatorGuardService);
    expect(service).toBeTruthy();
  });
});
