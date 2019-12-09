import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenLayerPartEditorComponent } from './token-layer-part-editor.component';

describe('TokenLayerPartEditorComponent', () => {
  let component: TokenLayerPartEditorComponent;
  let fixture: ComponentFixture<TokenLayerPartEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenLayerPartEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenLayerPartEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
