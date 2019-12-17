import { async, TestBed } from '@angular/core/testing';
import { FeatureResetPasswordModule } from './feature-reset-password.module';

describe('FeatureResetPasswordModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureResetPasswordModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureResetPasswordModule).toBeDefined();
  });
});
