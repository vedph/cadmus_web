import { async, TestBed } from '@angular/core/testing';
import { FeatureItemSearchModule } from './feature-item-search.module';

describe('FeatureItemSearchModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureItemSearchModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureItemSearchModule).toBeDefined();
  });
});
