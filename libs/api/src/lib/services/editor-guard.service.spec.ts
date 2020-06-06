import { TestBed } from '@angular/core/testing';

import { EditorGuardService } from './editor-guard.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditorGuardService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [HttpClient, RouterTestingModule],
    })
  );

  it('should be created', () => {
    const service: EditorGuardService = TestBed.inject(EditorGuardService);
    expect(service).toBeTruthy();
  });
});
