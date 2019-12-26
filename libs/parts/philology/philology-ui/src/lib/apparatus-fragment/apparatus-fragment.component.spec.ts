import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparatusFragmentComponent } from './apparatus-fragment.component';

describe('ApparatusFragmentComponent', () => {
  let component: ApparatusFragmentComponent;
  let fixture: ComponentFixture<ApparatusFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApparatusFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparatusFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
