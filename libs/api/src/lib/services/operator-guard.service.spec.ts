import { TestBed } from '@angular/core/testing';

import { OperatorGuardService } from './operator-guard.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('OperatorGuardService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [HttpClient, RouterTestingModule],
    })
  );

  it('should be created', () => {
    const service: OperatorGuardService = TestBed.inject(OperatorGuardService);
    expect(service).toBeTruthy();
  });
});
