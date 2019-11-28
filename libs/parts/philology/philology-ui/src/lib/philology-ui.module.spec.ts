import { async, TestBed } from '@angular/core/testing';
import { PhilologyUiModule } from './philology-ui.module';

describe('PhilologyUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PhilologyUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PhilologyUiModule).toBeDefined();
  });
});
