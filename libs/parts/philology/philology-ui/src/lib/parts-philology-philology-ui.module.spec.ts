import { async, TestBed } from '@angular/core/testing';
import { PartsPhilologyPhilologyUiModule } from './parts-philology-philology-ui.module';

describe('PartsPhilologyPhilologyUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PartsPhilologyPhilologyUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PartsPhilologyPhilologyUiModule).toBeDefined();
  });
});
