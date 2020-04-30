import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesaurusListComponent } from './thesaurus-list.component';

describe('ThesaurusListComponent', () => {
  let component: ThesaurusListComponent;
  let fixture: ComponentFixture<ThesaurusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesaurusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesaurusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
