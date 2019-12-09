import { async, TestBed } from '@angular/core/testing';
import { FeatureTokenLayerPartEditorModule } from './feature-token-layer-part-editor.module';

describe('FeatureTokenLayerPartEditorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureTokenLayerPartEditorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureTokenLayerPartEditorModule).toBeDefined();
  });
});
