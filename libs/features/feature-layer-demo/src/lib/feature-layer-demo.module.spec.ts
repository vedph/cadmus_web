import { async, TestBed } from '@angular/core/testing';
import { FeatureLayerDemoModule } from './feature-layer-demo.module';

describe('FeatureLayerDemoModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureLayerDemoModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureLayerDemoModule).toBeDefined();
  });
});
