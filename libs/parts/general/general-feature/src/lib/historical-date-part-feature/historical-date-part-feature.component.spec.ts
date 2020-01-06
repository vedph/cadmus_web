import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDatePartFeatureComponent } from './historical-date-part-feature.component';

describe('HistoricalDatePartFeatureComponent', () => {
  let component: HistoricalDatePartFeatureComponent;
  let fixture: ComponentFixture<HistoricalDatePartFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalDatePartFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalDatePartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
