import { TestBed } from '@angular/core/testing';

import { LibraryRouteService } from './library-route.service';
import { EnvServiceProvider } from '@cadmus/core';

describe('LibraryRouteServiceService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        EnvServiceProvider,
        {
          provide: 'partEditorKeys',
          useValue: {}
        }
      ]
    })
  );

  it('should be created', () => {
    const service: LibraryRouteService = TestBed.inject(LibraryRouteService);
    expect(service).toBeTruthy();
  });
});
