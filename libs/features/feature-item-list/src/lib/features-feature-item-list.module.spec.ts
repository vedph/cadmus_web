import { async, TestBed } from '@angular/core/testing';
import { FeaturesFeatureItemListModule } from './features-feature-item-list.module';

describe('FeaturesFeatureItemListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeaturesFeatureItemListModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeaturesFeatureItemListModule).toBeDefined();
  });
});
