import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSaveButtonsComponent } from './close-save-buttons.component';

describe('CloseSaveButtonsComponent', () => {
  let component: CloseSaveButtonsComponent;
  let fixture: ComponentFixture<CloseSaveButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseSaveButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseSaveButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
