import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsFragmentDemoComponent } from './quotations-fragment-demo.component';

describe('QuotationsFragmentDemoComponent', () => {
  let component: QuotationsFragmentDemoComponent;
  let fixture: ComponentFixture<QuotationsFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationsFragmentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationsFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
