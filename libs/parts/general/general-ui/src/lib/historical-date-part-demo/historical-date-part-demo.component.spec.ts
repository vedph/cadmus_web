import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDatePartDemoComponent } from './historical-date-part-demo.component';

describe('HistoricalDatePartDemoComponent', () => {
  let component: HistoricalDatePartDemoComponent;
  let fixture: ComponentFixture<HistoricalDatePartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalDatePartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalDatePartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
