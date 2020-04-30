import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesaurusFilterComponent } from './thesaurus-filter.component';

describe('ThesaurusFilterComponent', () => {
  let component: ThesaurusFilterComponent;
  let fixture: ComponentFixture<ThesaurusFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesaurusFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesaurusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
