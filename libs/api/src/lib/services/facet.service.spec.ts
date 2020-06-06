import { TestBed } from '@angular/core/testing';

import { FacetService } from './facet.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EnvServiceProvider } from '@cadmus/core';

describe('FacetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        EnvServiceProvider
      ]
    });
  });

  it('should be created', () => {
    const service: FacetService = TestBed.inject(FacetService);
    expect(service).toBeTruthy();
  });
});
