import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditorComponent } from './item-editor.component';

describe('ItemEditorComponent', () => {
  let component: ItemEditorComponent;
  let fixture: ComponentFixture<ItemEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
