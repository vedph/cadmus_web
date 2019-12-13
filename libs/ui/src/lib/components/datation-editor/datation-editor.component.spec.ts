import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatationEditorComponent } from './datation-editor.component';

describe('DatationEditorComponent', () => {
  let component: DatationEditorComponent;
  let fixture: ComponentFixture<DatationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
