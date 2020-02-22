import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerHintsComponent } from './layer-hints.component';

describe('LayerHintsComponent', () => {
  let component: LayerHintsComponent;
  let fixture: ComponentFixture<LayerHintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerHintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
