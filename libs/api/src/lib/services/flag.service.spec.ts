import { TestBed, inject } from '@angular/core/testing';

import { FlagService } from './flag.service';

describe('FlagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlagService]
    });
  });

  it('should be created', inject([FlagService], (service: FlagService) => {
    expect(service).toBeTruthy();
  }));
});
