import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDateEditorComponent } from './historical-date-editor.component';

describe('HistoricalDateEditorComponent', () => {
  let component: HistoricalDateEditorComponent;
  let fixture: ComponentFixture<HistoricalDateEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalDateEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalDateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
