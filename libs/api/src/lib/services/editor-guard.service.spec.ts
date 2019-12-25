import { TestBed } from '@angular/core/testing';

import { EditorGuardService } from './editor-guard.service';

describe('EditorGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorGuardService = TestBed.get(EditorGuardService);
    expect(service).toBeTruthy();
  });
});
