import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EnvServiceProvider } from '@cadmus/core';

describe('ItemService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        EnvServiceProvider
      ]
    })
  );

  it('should be created', () => {
    const service: ItemService = TestBed.inject(ItemService);
    expect(service).toBeTruthy();
  });
});
