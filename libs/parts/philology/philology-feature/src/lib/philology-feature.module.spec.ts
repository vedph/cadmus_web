import { async, TestBed } from '@angular/core/testing';
import { PhilologyFeatureModule } from './philology-feature.module';

describe('PhilologyFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PhilologyFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PhilologyFeatureModule).toBeDefined();
  });
});
