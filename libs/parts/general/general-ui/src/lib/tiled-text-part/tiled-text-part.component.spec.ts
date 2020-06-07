import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiledTextPartComponent } from './tiled-text-part.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TextTileComponent } from '../text-tile/text-tile.component';
import { TiledDataComponent } from '../tiled-data/tiled-data.component';

describe('TiledTextPartComponent', () => {
  let component: TiledTextPartComponent;
  let fixture: ComponentFixture<TiledTextPartComponent>;

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
        TiledTextPartComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiledTextPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
