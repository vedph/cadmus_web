import { TestBed } from '@angular/core/testing';

import { ItemBrowserService } from './item-browser.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EnvServiceProvider } from '@cadmus/core';

describe('ItemBrowserService', () => {
  let service: ItemBrowserService;

  beforeEach(() => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [HttpClient, EnvServiceProvider]
      })
    );
    service = TestBed.inject(ItemBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
