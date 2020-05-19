import { TestBed } from '@angular/core/testing';

import { QuotationWorksService } from './quotation-works.service';

describe('QuotationWorksService', () => {
  let service: QuotationWorksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotationWorksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
