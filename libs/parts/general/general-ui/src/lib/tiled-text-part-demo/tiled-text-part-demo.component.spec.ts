import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiledTextPartDemoComponent } from './tiled-text-part-demo.component';
import { UiModule } from '@cadmus/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { TiledTextPartComponent } from '../tiled-text-part/tiled-text-part.component';
import { TextTileComponent } from '../text-tile/text-tile.component';
import { TiledDataComponent } from '../tiled-data/tiled-data.component';
import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TiledTextPartDemoComponent', () => {
  let component: TiledTextPartDemoComponent;
  let fixture: ComponentFixture<TiledTextPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        CoreModule,
        MaterialModule,
        UiModule,
      ],
      declarations: [
        TiledDataComponent,
        TextTileComponent,
        TiledTextPartComponent,
        TiledTextPartDemoComponent
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
    fixture = TestBed.createComponent(TiledTextPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
