import { async, TestBed } from '@angular/core/testing';
import { FeatureItemListModule } from './feature-item-list.module';

describe('FeaturesFeatureItemListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureItemListModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureItemListModule).toBeDefined();
  });
});
