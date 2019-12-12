import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsPartDemoComponent } from './keywords-part-demo.component';

describe('KeywordsPartDemoComponent', () => {
  let component: KeywordsPartDemoComponent;
  let fixture: ComponentFixture<KeywordsPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsPartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
