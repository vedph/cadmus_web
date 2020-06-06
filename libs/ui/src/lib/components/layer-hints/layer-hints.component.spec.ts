import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerHintsComponent } from './layer-hints.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';

describe('LayerHintsComponent', () => {
  let component: LayerHintsComponent;
  let fixture: ComponentFixture<LayerHintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MaterialModule],
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
