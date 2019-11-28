import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEditorResourcesComponent } from './json-editor-resources.component';

describe('JsonEditorResourcesComponent', () => {
  let component: JsonEditorResourcesComponent;
  let fixture: ComponentFixture<JsonEditorResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonEditorResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
