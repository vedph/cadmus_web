import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureHistoricalDatePartDemoComponent } from './feature-historical-date-part-demo.component';

describe('FeatureHistoricalDatePartDemoComponent', () => {
  let component: FeatureHistoricalDatePartDemoComponent;
  let fixture: ComponentFixture<FeatureHistoricalDatePartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureHistoricalDatePartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureHistoricalDatePartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
