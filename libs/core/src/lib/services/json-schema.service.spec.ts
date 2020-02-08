import { TestBed } from '@angular/core/testing';

import { JsonSchemaService } from './json-schema.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('JsonSchemaService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers: [HttpClient]
    })
  );

  it('should be created', () => {
    const service: JsonSchemaService = TestBed.inject(JsonSchemaService);
    expect(service).toBeTruthy();
  });
});
