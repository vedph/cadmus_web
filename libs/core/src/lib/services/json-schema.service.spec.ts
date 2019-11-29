import { TestBed } from '@angular/core/testing';

import { JsonSchemaService } from './json-schema.service';

describe('JsonSchemaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonSchemaService = TestBed.get(JsonSchemaService);
    expect(service).toBeTruthy();
  });
});
