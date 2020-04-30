import { async, TestBed } from '@angular/core/testing';
import { FeatureThesaurusEditorModule } from './feature-thesaurus-editor.module';

describe('FeatureThesaurusEditorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureThesaurusEditorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureThesaurusEditorModule).toBeDefined();
  });
});
