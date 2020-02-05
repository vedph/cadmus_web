import { TestBed } from '@angular/core/testing';

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
import { CoreModule, TokenLocation } from '@cadmus/core';
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
        CoreModule,
        GeneralUiModule
      ],
      // https://github.com/angular/components/issues/14668
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        }
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

    for (let y = 1; y <= 3; y++) {
      const row = stateRows[y - 1];
      for (let x = 1; x <= y; x++) {
        expect(row.tiles[x - 1].checked).toBeFalsy();
        expect(row.tiles[x - 1].frIndex).toBe(-1);
      }
    }
  });

  it('setTileState for checked should set checked only', () => {
    const state = new TiledTextUIState(rows);

    state.setTileState({checked: true, frIndex: 123}, true, false);

    const stateRows = state.rows;
    for (let y = 1; y <= 3; y++) {
      const row = stateRows[y - 1];
      for (let x = 1; x <= y; x++) {
        expect(row.tiles[x - 1].checked).toBeTruthy();
        expect(row.tiles[x - 1].frIndex).toBe(-1);
      }
    }
  });

  it('setTileState for frIndex should set frIndex only', () => {
    const state = new TiledTextUIState(rows);

    state.setTileState({checked: true, frIndex: 1}, false, true);

    const stateRows = state.rows;
    for (let y = 1; y <= 3; y++) {
      const row = stateRows[y - 1];
      for (let x = 1; x <= y; x++) {
        expect(row.tiles[x - 1].checked).toBeFalsy();
        expect(row.tiles[x - 1].frIndex).toBe(1);
      }
    }
  });

  it ('setFragmentLocations (points) should set frIndex', () => {
    const state = new TiledTextUIState(rows);
    const locations: TokenLocation[] = [];
    locations.push(TokenLocation.parse('2.1'));
    locations.push(TokenLocation.parse('3.3'));

    state.setFragmentLocations(locations);

    const stateRows = state.rows;
    // 1.1
    expect(stateRows[0].tiles[0].frIndex).toBe(-1);
    // 2.1=0 2.2
    expect(stateRows[1].tiles[0].frIndex).toBe(0);
    expect(stateRows[1].tiles[1].frIndex).toBe(-1);
    // 3.1 3.2 3.3=1
    expect(stateRows[2].tiles[0].frIndex).toBe(-1);
    expect(stateRows[2].tiles[1].frIndex).toBe(-1);
    expect(stateRows[2].tiles[2].frIndex).toBe(1);
  });

  it ('setFragmentLocations (ranges) should set frIndex', () => {
    const state = new TiledTextUIState(rows);
    const locations: TokenLocation[] = [];
    locations.push(TokenLocation.parse('2.1-3.1'));
    locations.push(TokenLocation.parse('3.2-3.3'));

    state.setFragmentLocations(locations);

    const stateRows = state.rows;
    // 1.1
    expect(stateRows[0].tiles[0].frIndex).toBe(-1);
    // 2.1=0 2.2=0
    expect(stateRows[1].tiles[0].frIndex).toBe(0);
    expect(stateRows[1].tiles[1].frIndex).toBe(0);
    // 3.1=0 3.2=1 3.3=1
    expect(stateRows[2].tiles[0].frIndex).toBe(0);
    expect(stateRows[2].tiles[1].frIndex).toBe(1);
    expect(stateRows[2].tiles[2].frIndex).toBe(1);
  });
});
