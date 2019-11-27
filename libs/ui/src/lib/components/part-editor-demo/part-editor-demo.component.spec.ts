import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartEditorDemoComponent } from './part-editor-demo.component';

describe('PartEditorDemoComponent', () => {
  let component: PartEditorDemoComponent;
  let fixture: ComponentFixture<PartEditorDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartEditorDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartEditorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
