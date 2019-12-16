import { async, TestBed } from '@angular/core/testing';
import { CoreModule } from './core.module';
import 'zone.js/dist/zone-testing';

describe('CoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreModule).toBeDefined();
  });
});
