import { TestBed } from '@angular/core/testing';

import { ThesaurusService } from './thesaurus.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

xdescribe('TagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient]
    });
  });

  it('should be created', () => {
    const service: ThesaurusService = TestBed.get(ThesaurusService);
    expect(service).toBeTruthy();
  });
});
