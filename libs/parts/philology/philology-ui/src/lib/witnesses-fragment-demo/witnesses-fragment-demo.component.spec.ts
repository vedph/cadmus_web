import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WitnessesFragmentDemoComponent } from './witnesses-fragment-demo.component';

describe('WitnessesFragmentDemoComponent', () => {
  let component: WitnessesFragmentDemoComponent;
  let fixture: ComponentFixture<WitnessesFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WitnessesFragmentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitnessesFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
