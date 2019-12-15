import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronologyFragmentComponent } from './chronology-fragment.component';

describe('ChronologyFragmentComponent', () => {
  let component: ChronologyFragmentComponent;
  let fixture: ComponentFixture<ChronologyFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronologyFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronologyFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
