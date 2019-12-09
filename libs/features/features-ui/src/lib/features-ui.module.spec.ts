import { async, TestBed } from '@angular/core/testing';
import { FeaturesUiModule } from './features-ui.module';

describe('FeaturesUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeaturesUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeaturesUiModule).toBeDefined();
  });
});
