import { async, TestBed } from '@angular/core/testing';
import { FeatureLoginModule } from './feature-login.module';

describe('FeatureLoginModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureLoginModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureLoginModule).toBeDefined();
  });
});
