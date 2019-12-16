/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('Service: LocalStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });
});
