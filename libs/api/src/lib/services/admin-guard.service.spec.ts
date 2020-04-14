import { TestBed } from '@angular/core/testing';

import { AdminGuardService } from './admin-guard.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EnvServiceProvider } from '@cadmus/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminGuardService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        HttpClient,
        EnvServiceProvider
      ]
    })
  );

  it('should be created', () => {
    const service: AdminGuardService = TestBed.inject(AdminGuardService);
    expect(service).toBeTruthy();
  });
});
