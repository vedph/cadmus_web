import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@cadmus/material';

import { TokenTextPartDemoComponent } from './token-text-part-demo.component';
import { TokenTextPartComponent } from '../token-text-part/token-text-part.component';
import { UiModule } from '@cadmus/ui';
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';
import { TextTileComponent } from '../text-tile/text-tile.component';

describe('TokenTextPartDemoComponent', () => {
  let component: TokenTextPartDemoComponent;
  let fixture: ComponentFixture<TokenTextPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MaterialModule,
        MonacoEditorModule,
        UiModule,
      ],
      declarations: [
        TextTileComponent,
        TokenTextPartComponent,
        TokenTextPartDemoComponent
      ],
      providers: [
        {
          provide: NGX_MONACO_EDITOR_CONFIG,
          useValue: {},
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenTextPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
