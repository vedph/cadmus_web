import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexKeywordsPartDemoComponent } from './index-keywords-part-demo.component';

describe('IndexKeywordsPartDemoComponent', () => {
  let component: IndexKeywordsPartDemoComponent;
  let fixture: ComponentFixture<IndexKeywordsPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexKeywordsPartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexKeywordsPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
