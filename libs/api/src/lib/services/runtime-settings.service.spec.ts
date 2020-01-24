import { TestBed } from '@angular/core/testing';

import { RuntimeSettingsService } from './runtime-settings.service';

describe('RuntimeSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuntimeSettingsService = TestBed.get(RuntimeSettingsService);
    expect(service).toBeTruthy();
  });
});
