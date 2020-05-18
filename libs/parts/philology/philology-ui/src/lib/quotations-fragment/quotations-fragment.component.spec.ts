import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsFragmentComponent } from './quotations-fragment.component';

describe('QuotationsFragmentComponent', () => {
  let component: QuotationsFragmentComponent;
  let fixture: ComponentFixture<QuotationsFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationsFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationsFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
