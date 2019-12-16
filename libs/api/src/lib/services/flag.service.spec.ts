import { TestBed } from '@angular/core/testing';

import { FlagService } from './flag.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('FlagService', () => {
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
    const service: FlagService = TestBed.get(FlagService);
    expect(service).toBeTruthy();
  });
});
