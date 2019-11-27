import { async, TestBed } from '@angular/core/testing';
import { FeaturesFeatureLayerDemoModule } from './features-feature-layer-demo.module';

describe('FeaturesFeatureLayerDemoModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeaturesFeatureLayerDemoModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeaturesFeatureLayerDemoModule).toBeDefined();
  });
});
