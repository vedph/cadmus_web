import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('ItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientModule
    ],
    providers: [ HttpClient ]
  }));

  it('should be created', () => {
    const service: ItemService = TestBed.get(ItemService);
    expect(service).toBeTruthy();
  });
});
