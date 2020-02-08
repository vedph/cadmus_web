import { TestBed } from '@angular/core/testing';

import { ThesaurusService } from './thesaurus.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

xdescribe('TagService', () => {
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
    const service: ThesaurusService = TestBed.inject(ThesaurusService);
    expect(service).toBeTruthy();
  });
});
