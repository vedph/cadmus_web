import { async, TestBed } from '@angular/core/testing';
import { GeneralUiModule } from './general-ui.module';

describe('GeneralUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GeneralUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(GeneralUiModule).toBeDefined();
  });
});
