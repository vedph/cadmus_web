import { TestBed } from '@angular/core/testing';

import { FacetService } from './facet.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('FacetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        { provide: 'apiEndpoint', useValue: 'none' },
        { provide: 'databaseId', useValue: 'cadmus' }
      ]
    });
  });

  it('should be created', () => {
    const service: FacetService = TestBed.inject(FacetService);
    expect(service).toBeTruthy();
  });
});
