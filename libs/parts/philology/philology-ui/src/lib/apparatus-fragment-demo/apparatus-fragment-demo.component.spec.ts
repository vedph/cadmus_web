import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparatusFragmentDemoComponent } from './apparatus-fragment-demo.component';

describe('ApparatusFragmentDemoComponent', () => {
  let component: ApparatusFragmentDemoComponent;
  let fixture: ComponentFixture<ApparatusFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApparatusFragmentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparatusFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
