import { async, TestBed } from '@angular/core/testing';
import { FeatureAdminModule } from './feature-admin.module';

describe('FeatureAdminModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureAdminModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureAdminModule).toBeDefined();
  });
});
