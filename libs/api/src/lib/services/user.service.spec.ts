import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

xdescribe('Service: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        { provide: 'apiEndpoint', useValue: 'none' },
        { provide: 'databaseId', useValue: 'cadmus' }
      ]
    });
  });

  it('should be created', () => {
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });
});
