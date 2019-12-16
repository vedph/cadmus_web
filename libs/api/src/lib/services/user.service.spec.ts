/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

xdescribe('Service: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient]
    });
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
