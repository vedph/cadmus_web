import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDatePartComponent } from './historical-date-part.component';

describe('HistoricalDatePartComponent', () => {
  let component: HistoricalDatePartComponent;
  let fixture: ComponentFixture<HistoricalDatePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalDatePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalDatePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
