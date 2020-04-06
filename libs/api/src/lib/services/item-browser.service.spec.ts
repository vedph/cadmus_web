import { TestBed } from '@angular/core/testing';

import { ItemBrowserService } from './item-browser.service';

describe('ItemBrowserService', () => {
  let service: ItemBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
