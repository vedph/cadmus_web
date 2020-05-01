import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingPartsComponent } from './missing-parts.component';

describe('MissingPartsComponent', () => {
  let component: MissingPartsComponent;
  let fixture: ComponentFixture<MissingPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
