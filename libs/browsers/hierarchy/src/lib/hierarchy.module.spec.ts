import { async, TestBed } from '@angular/core/testing';
import { HierarchyModule } from './hierarchy.module';

describe('HierarchyModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HierarchyModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(HierarchyModule).toBeDefined();
  });
});
