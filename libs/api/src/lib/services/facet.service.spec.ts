import { TestBed, inject } from '@angular/core/testing';

import { FacetService } from './facet.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('FacetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers: [ HttpClient ]
    });
  });

  it('should be created', () => {
    const service: FacetService = TestBed.get(FacetService);
    expect(service).toBeTruthy();
  });
});
