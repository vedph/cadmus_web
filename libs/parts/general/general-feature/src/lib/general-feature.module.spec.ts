import { async, TestBed } from '@angular/core/testing';
import { GeneralFeatureModule } from './general-feature.module';

describe('GeneralFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GeneralFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(GeneralFeatureModule).toBeDefined();
  });
});
