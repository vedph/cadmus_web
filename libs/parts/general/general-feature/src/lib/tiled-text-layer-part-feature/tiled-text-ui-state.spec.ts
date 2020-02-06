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
        RouterTestingModule
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

  it('setTileState for checked sets checked only', () => {
    const state = new TiledTextUIState(rows);

    state.setTileState({ checked: true, frIndex: 123 }, true, false);

    const stateRows = state.rows;
    for (let y = 1; y <= 3; y++) {
      const row = stateRows[y - 1];
      for (let x = 1; x <= y; x++) {
        expect(row.tiles[x - 1].checked).toBeTruthy();
        expect(row.tiles[x - 1].frIndex).toBe(-1);
      }
    }
  });

  it('setTileState for frIndex sets frIndex only', () => {
    const state = new TiledTextUIState(rows);

    state.setTileState({ checked: true, frIndex: 1 }, false, true);

    const stateRows = state.rows;
    for (let y = 1; y <= 3; y++) {
      const row = stateRows[y - 1];
      for (let x = 1; x <= y; x++) {
        expect(row.tiles[x - 1].checked).toBeFalsy();
        expect(row.tiles[x - 1].frIndex).toBe(1);
      }
    }
  });

  it('setFragmentLocations (points) sets frIndex', () => {
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

  it('setFragmentLocations (ranges) sets frIndex', () => {
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

  it('findFirstCheckedCoords with none checked rets null', () => {
    const state = new TiledTextUIState(rows);

    expect(state.findFirstCheckedCoords(1, 1, true)).toBeNull();
  });

  it('findFirstCheckedCoords for unchecked with none checked rets coords', () => {
    const state = new TiledTextUIState(rows);

    const yx = state.findFirstCheckedCoords(1, 1, false);

    expect(yx.y).toBe(1);
    expect(yx.x).toBe(1);
  });

  it('findFirstCheckedCoords (reverse) for unchecked with none checked rets coords', () => {
    const state = new TiledTextUIState(rows);

    const yx = state.findFirstCheckedCoords(3, 3, false, true);

    expect(yx.y).toBe(3);
    expect(yx.x).toBe(3);
  });

  it('findFirstCheckedCoords (reverse) with none checked rets null', () => {
    const state = new TiledTextUIState(rows);

    expect(state.findFirstCheckedCoords(3, 3, true, true)).toBeNull();
  });

  it('findFirstCheckedCoords with checked rets coords', () => {
    const state = new TiledTextUIState(rows);
    state.linearSetCheck(3, 2, 3, 2, true);

    const yx = state.findFirstCheckedCoords(1, 1, true);

    expect(yx.y).toBe(3);
    expect(yx.x).toBe(2);
  });

  it('findFirstCheckedCoords (reverse) with checked rets coords', () => {
    const state = new TiledTextUIState(rows);
    state.linearSetCheck(2, 1, 2, 1, true);

    const yx = state.findFirstCheckedCoords(3, 3, true, true);

    expect(yx.y).toBe(2);
    expect(yx.x).toBe(1);
  });

  it('linearSetCheck a single tile checks it', () => {
    const state = new TiledTextUIState(rows);

    state.linearSetCheck(1, 1, 1, 1, true);

    const stateRows = state.rows;
    // [1.1]
    expect(stateRows[0].tiles[0].checked).toBeTruthy();
    // 2.1 2.2
    expect(stateRows[1].tiles[0].checked).toBeFalsy();
    expect(stateRows[1].tiles[1].checked).toBeFalsy();
    // 3.1 3.2 3.3
    expect(stateRows[2].tiles[0].checked).toBeFalsy();
    expect(stateRows[2].tiles[1].checked).toBeFalsy();
    expect(stateRows[2].tiles[2].checked).toBeFalsy();
  });

  it('linearSetCheck 2 tiles in a row checks them', () => {
    const state = new TiledTextUIState(rows);

    state.linearSetCheck(3, 2, 3, 3, true);

    const stateRows = state.rows;
    // 1.1
    expect(stateRows[0].tiles[0].checked).toBeFalsy();
    // 2.1 2.2
    expect(stateRows[1].tiles[0].checked).toBeFalsy();
    expect(stateRows[1].tiles[1].checked).toBeFalsy();
    // 3.1 [3.2 3.3]
    expect(stateRows[2].tiles[0].checked).toBeFalsy();
    expect(stateRows[2].tiles[1].checked).toBeTruthy();
    expect(stateRows[2].tiles[2].checked).toBeTruthy();
  });

  it('linearSetCheck tiles spanning 2 rows checks them', () => {
    const state = new TiledTextUIState(rows);

    state.linearSetCheck(2, 1, 3, 2, true);

    const stateRows = state.rows;
    // 1.1
    expect(stateRows[0].tiles[0].checked).toBeFalsy();
    // [2.1 2.2
    expect(stateRows[1].tiles[0].checked).toBeTruthy();
    expect(stateRows[1].tiles[1].checked).toBeTruthy();
    // 3.1 3.2] 3.3
    expect(stateRows[2].tiles[0].checked).toBeTruthy();
    expect(stateRows[2].tiles[1].checked).toBeTruthy();
    expect(stateRows[2].tiles[2].checked).toBeFalsy();
  });

  it('linearSetCheck tiles for uncheck spanning 2 rows unchecks them', () => {
    const state = new TiledTextUIState(rows);
    state.setTileState({ checked: true, frIndex: -1 }, true, false);

    state.linearSetCheck(2, 1, 3, 2, false);

    const stateRows = state.rows;
    // 1.1
    expect(stateRows[0].tiles[0].checked).toBeTruthy();
    // [2.1 2.2
    expect(stateRows[1].tiles[0].checked).toBeFalsy();
    expect(stateRows[1].tiles[1].checked).toBeFalsy();
    // 3.1 3.2] 3.3
    expect(stateRows[2].tiles[0].checked).toBeFalsy();
    expect(stateRows[2].tiles[1].checked).toBeFalsy();
    expect(stateRows[2].tiles[2].checked).toBeTruthy();
  });

  it('getNextTileCoords from non-last tile in row rets its right sibling', () => {
    const state = new TiledTextUIState(rows);

    const yx = state.getNextTileCoords(2, 1);

    expect(yx.y).toBe(2);
    expect(yx.x).toBe(2);
  });

  it('getNextTileCoords from last tile in row rets 1st tile in next row', () => {
    const state = new TiledTextUIState(rows);

    const yx = state.getNextTileCoords(1, 1);

    expect(yx.y).toBe(2);
    expect(yx.x).toBe(1);
  });

  it('getNextTileCoords from last tile in last row rets null', () => {
    const state = new TiledTextUIState(rows);

    const yx = state.getNextTileCoords(3, 3);

    expect(yx).toBeNull();
  });

  it('getPrevTileCoords from non-first tile in row rets its left sibling', () => {
    const state = new TiledTextUIState(rows);

    const yx = state.getPrevTileCoords(2, 2);

    expect(yx.y).toBe(2);
    expect(yx.x).toBe(1);
  });

  it('getPrevTileCoords from first tile in row rets last tile in prev row', () => {
    const state = new TiledTextUIState(rows);

    const yx = state.getPrevTileCoords(3, 1);

    expect(yx.y).toBe(2);
    expect(yx.x).toBe(2);
  });

  it('getPrevTileCoords from first tile in first row rets null', () => {
    const state = new TiledTextUIState(rows);

    const yx = state.getPrevTileCoords(1, 1);

    expect(yx).toBeNull();
  });

  it('getCheckedLocation with no checked rets null', () => {
    const state = new TiledTextUIState(rows);

    expect(state.getCheckedLocation()).toBeNull();
  });

  it('getCheckedLocation with single checked rets point location', () => {
    const state = new TiledTextUIState(rows);
    state.linearSetCheck(3, 2, 3, 2, true);

    const loc = state.getCheckedLocation();

    expect(loc.toString()).toBe('3.2');
  });

  it('getCheckedLocation with several checkeds rets range location', () => {
    const state = new TiledTextUIState(rows);
    state.linearSetCheck(2, 2, 3, 2, true);

    const loc = state.getCheckedLocation();

    expect(loc.toString()).toBe('2.2-3.2');
  });

  it('getCheckedLocationAndFragment no checked rets null', () => {
    const state = new TiledTextUIState(rows);

    const fl = state.getCheckedLocationAndFragment();

    expect(fl).toBeNull();
  });

  it('getCheckedLocationAndFragment checked no fragment rets location', () => {
    const state = new TiledTextUIState(rows);
    state.linearSetCheck(2, 2, 3, 2, true);

    const fl = state.getCheckedLocationAndFragment();

    expect(fl.fragment).toBe(-1);
    expect(fl.location).toBeTruthy();
    expect(fl.location.toString()).toBe('2.2-3.2');
  });

  it('getCheckedLocationAndFragment checked outside fragment rets location', () => {
    const state = new TiledTextUIState(rows);
    state.linearSetCheck(2, 2, 3, 2, true);
    state.setFragmentLocations([TokenLocation.parse('3.3')]);

    const fl = state.getCheckedLocationAndFragment();

    expect(fl.fragment).toBe(-1);
    expect(fl.location).toBeTruthy();
    expect(fl.location.toString()).toBe('2.2-3.2');
  });

  it('getCheckedLocationAndFragment checked inside fragment rets location and fragment', () => {
    const state = new TiledTextUIState(rows);
    state.linearSetCheck(2, 2, 3, 2, true);
    state.setFragmentLocations([TokenLocation.parse('3.2')]);

    const fl = state.getCheckedLocationAndFragment();

    expect(fl.fragment).toBe(0);
    expect(fl.location).toBeTruthy();
    expect(fl.location.toString()).toBe('2.2-3.2');
  });
});
