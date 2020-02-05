import { TestBed, async } from '@angular/core/testing';

import { TiledTextUIState } from './tiled-text-ui-state';
import { TextTileRow, GeneralUiModule } from '@cadmus/parts/general/general-ui';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { CurrentItemBarComponent, FeaturesUiModule } from '@cadmus/features/features-ui';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { CoreModule } from '@cadmus/core';
import { GeneralFeatureModule } from '../general-feature.module';
import { EditStateModule } from '@cadmus/features/edit-state';

describe('TiledTextUIState', () => {
  let rows: TextTileRow[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        AkitaNgDevtools.forRoot(),
        MaterialModule,
        UiModule,
        CoreModule,
        GeneralUiModule,
        GeneralFeatureModule,
        EditStateModule,
        FeaturesUiModule
      ],
      // https://github.com/angular/components/issues/14668
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        },
        {
          provide: 'apiEndpoint',
          useValue: 'http://localhost:60304/api/'
        },
        {
          provide: 'databaseId',
          useValue: 'cadmus'
        }
      ],
      declarations: [
        //CurrentItemBarComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    rows = [];
    for (let y = 1; y <= 3; y++) {
      const row = {
        y: y,
        tiles: []
      };
      rows.push(row);
      for (let x = 1; x <= y; x++) {
        row.tiles.push({
          x: x,
          data: {
            text: 'c' + y + '-' + x
          }
        });
      }
    }
  });

  it('should be created from rows', () => {
    const state = new TiledTextUIState(rows);
    expect(state).toBeTruthy();
    const stateRows = state.rows;
    expect(stateRows.length).toBe(3);
    expect(stateRows[0].tiles.length).toBe(1);
    expect(stateRows[1].tiles.length).toBe(2);
    expect(stateRows[2].tiles.length).toBe(3);
  });
});
