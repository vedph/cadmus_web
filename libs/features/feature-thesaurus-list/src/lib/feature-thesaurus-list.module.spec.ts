import { async, TestBed } from '@angular/core/testing';
import { FeatureThesaurusListModule } from './feature-thesaurus-list.module';

describe('FeatureThesaurusListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureThesaurusListModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureThesaurusListModule).toBeDefined();
  });
});
