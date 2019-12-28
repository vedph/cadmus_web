import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WitnessesFragmentComponent } from './witnesses-fragment.component';

describe('WitnessesFragmentComponent', () => {
  let component: WitnessesFragmentComponent;
  let fixture: ComponentFixture<WitnessesFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WitnessesFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitnessesFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
