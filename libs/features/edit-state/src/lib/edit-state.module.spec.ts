import { async, TestBed } from '@angular/core/testing';
import { EditStateModule } from './edit-state.module';

describe('EditStateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EditStateModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(EditStateModule).toBeDefined();
  });
});
