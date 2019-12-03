import { async, TestBed } from '@angular/core/testing';
import { FeatureItemEditorModule } from './feature-item-editor.module';

describe('FeatureItemEditorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureItemEditorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureItemEditorModule).toBeDefined();
  });
});
