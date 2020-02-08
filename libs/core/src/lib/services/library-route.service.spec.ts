import { TestBed } from '@angular/core/testing';

import { LibraryRouteService } from './library-route.service';

describe('LibraryRouteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibraryRouteService = TestBed.inject(
      LibraryRouteService
    );
    expect(service).toBeTruthy();
  });
});
