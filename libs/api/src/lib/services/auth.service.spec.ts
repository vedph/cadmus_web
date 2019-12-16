import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientModule
    ],
    providers: [HttpClient]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
