import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { TextTileRow } from '@cadmus/parts/general/general-ui';
import { TokenLocation, CoreModule } from '@cadmus/core';
import { TiledTextLayerView } from './tiled-text-layer-view';

describe('TiledTextLayerView', () => {
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
    const view = new TiledTextLayerView(rows);

    expect(view).toBeTruthy();

    const stateRows = view.rows;
    expect(stateRows.length).toBe(3);
    expect(stateRows[0].tiles.length).toBe(1);
    expect(stateRows[1].tiles.length).toBe(2);
    expect(stateRows[2].tiles.length).toBe(3);

    for (let y = 1; y <= 3; y++) {
      const row = stateRows[y - 1];
      for (let x = 1; x <= y; x++) {
        expect(row.tiles[x - 1].checked).toBeFalsy();
        expect(row.tiles[x - 1].frIndex).toBe(-1);
        expect(row.tiles[x - 1].model).toBe(rows[y - 1].tiles[x - 1]);
      }
    }
  });

  it('setAllTilesViewState checked sets checked only', () => {
    const view = new TiledTextLayerView(rows);

    view.setAllTilesViewState({ checked: true });

    const stateRows = view.rows;
    for (let y = 1; y <= 3; y++) {
      const row = stateRows[y - 1];
      for (let x = 1; x <= y; x++) {
        expect(row.tiles[x - 1].checked).toBeTruthy();
        expect(row.tiles[x - 1].frIndex).toBe(-1);
      }
    }
  });

  it('setAllTilesViewState frIndex sets frIndex only', () => {
    const view = new TiledTextLayerView(rows);

    view.setAllTilesViewState({ frIndex: 1 });

    const stateRows = view.rows;
    for (let y = 1; y <= 3; y++) {
      const row = stateRows[y - 1];
      for (let x = 1; x <= y; x++) {
        expect(row.tiles[x - 1].checked).toBeFalsy();
        expect(row.tiles[x - 1].frIndex).toBe(1);
      }
    }
  });

  it('setFragmentLocations (points) sets frIndex', () => {
    const view = new TiledTextLayerView(rows);
    const locations: TokenLocation[] = [];
    locations.push(TokenLocation.parse('2.1'));
    locations.push(TokenLocation.parse('3.3'));

    view.setFragmentLocations(locations);

    const stateRows = view.rows;
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
    const view = new TiledTextLayerView(rows);
    const locations: TokenLocation[] = [];
    locations.push(TokenLocation.parse('2.1-3.1'));
    locations.push(TokenLocation.parse('3.2-3.3'));

    view.setFragmentLocations(locations);

    const stateRows = view.rows;
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
    const view = new TiledTextLayerView(rows);

    expect(view.findFirstCheckedCoords(1, 1, true)).toBeNull();
  });

  it('findFirstCheckedCoords for unchecked with none checked rets coords', () => {
    const view = new TiledTextLayerView(rows);

    const yx = view.findFirstCheckedCoords(1, 1, false);

    expect(yx.y).toBe(1);
    expect(yx.x).toBe(1);
  });

  it('findFirstCheckedCoords (reverse) for unchecked with none checked rets coords', () => {
    const view = new TiledTextLayerView(rows);

    const yx = view.findFirstCheckedCoords(3, 3, false, true);

    expect(yx.y).toBe(3);
    expect(yx.x).toBe(3);
  });

  it('findFirstCheckedCoords (reverse) with none checked rets null', () => {
    const view = new TiledTextLayerView(rows);

    expect(view.findFirstCheckedCoords(3, 3, true, true)).toBeNull();
  });

  it('findFirstCheckedCoords with checked rets coords', () => {
    const view = new TiledTextLayerView(rows);
    view.linearSetCheck(3, 2, 3, 2, true);

    const yx = view.findFirstCheckedCoords(1, 1, true);

    expect(yx.y).toBe(3);
    expect(yx.x).toBe(2);
  });

  it('findFirstCheckedCoords (reverse) with checked rets coords', () => {
    const view = new TiledTextLayerView(rows);
    view.linearSetCheck(2, 1, 2, 1, true);

    const yx = view.findFirstCheckedCoords(3, 3, true, true);

    expect(yx.y).toBe(2);
    expect(yx.x).toBe(1);
  });

  it('linearSetCheck a single tile checks it', () => {
    const view = new TiledTextLayerView(rows);

    view.linearSetCheck(1, 1, 1, 1, true);

    const stateRows = view.rows;
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
    const view = new TiledTextLayerView(rows);

    view.linearSetCheck(3, 2, 3, 3, true);

    const stateRows = view.rows;
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
    const view = new TiledTextLayerView(rows);

    view.linearSetCheck(2, 1, 3, 2, true);

    const stateRows = view.rows;
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
    const view = new TiledTextLayerView(rows);
    view.setAllTilesViewState({ checked: true });

    view.linearSetCheck(2, 1, 3, 2, false);

    const stateRows = view.rows;
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
    const view = new TiledTextLayerView(rows);

    const yx = view.getNextTileCoords(2, 1);

    expect(yx.y).toBe(2);
    expect(yx.x).toBe(2);
  });

  it('getNextTileCoords from last tile in row rets 1st tile in next row', () => {
    const view = new TiledTextLayerView(rows);

    const yx = view.getNextTileCoords(1, 1);

    expect(yx.y).toBe(2);
    expect(yx.x).toBe(1);
  });

  it('getNextTileCoords from last tile in last row rets null', () => {
    const view = new TiledTextLayerView(rows);

    const yx = view.getNextTileCoords(3, 3);

    expect(yx).toBeNull();
  });

  it('getPrevTileCoords from non-first tile in row rets its left sibling', () => {
    const view = new TiledTextLayerView(rows);

    const yx = view.getPrevTileCoords(2, 2);

    expect(yx.y).toBe(2);
    expect(yx.x).toBe(1);
  });

  it('getPrevTileCoords from first tile in row rets last tile in prev row', () => {
    const view = new TiledTextLayerView(rows);

    const yx = view.getPrevTileCoords(3, 1);

    expect(yx.y).toBe(2);
    expect(yx.x).toBe(2);
  });

  it('getPrevTileCoords from first tile in first row rets null', () => {
    const view = new TiledTextLayerView(rows);

    const yx = view.getPrevTileCoords(1, 1);

    expect(yx).toBeNull();
  });

  it('getCheckedLocation with no checked rets null', () => {
    const view = new TiledTextLayerView(rows);

    expect(view.getCheckedLocation()).toBeNull();
  });

  it('getCheckedLocation with single checked rets point location', () => {
    const view = new TiledTextLayerView(rows);
    view.linearSetCheck(3, 2, 3, 2, true);

    const loc = view.getCheckedLocation();

    expect(loc.toString()).toBe('3.2');
  });

  it('getCheckedLocation with several checkeds rets range location', () => {
    const view = new TiledTextLayerView(rows);
    view.linearSetCheck(2, 2, 3, 2, true);

    const loc = view.getCheckedLocation();

    expect(loc.toString()).toBe('2.2-3.2');
  });

  it('getCheckedLocationAndFragment no checked rets null', () => {
    const view = new TiledTextLayerView(rows);

    const fl = view.getCheckedLocationAndFragment();

    expect(fl).toBeNull();
  });

  it('getCheckedLocationAndFragment checked no fragment rets location', () => {
    const view = new TiledTextLayerView(rows);
    view.linearSetCheck(2, 2, 3, 2, true);

    const fl = view.getCheckedLocationAndFragment();

    expect(fl.fragment).toBe(-1);
    expect(fl.location).toBeTruthy();
    expect(fl.location.toString()).toBe('2.2-3.2');
  });

  it('getCheckedLocationAndFragment checked outside fragment rets location', () => {
    const view = new TiledTextLayerView(rows);
    view.linearSetCheck(2, 2, 3, 2, true);
    view.setFragmentLocations([TokenLocation.parse('3.3')]);

    const fl = view.getCheckedLocationAndFragment();

    expect(fl.fragment).toBe(-1);
    expect(fl.location).toBeTruthy();
    expect(fl.location.toString()).toBe('2.2-3.2');
  });

  it('getCheckedLocationAndFragment checked inside fragment rets location and fragment', () => {
    const view = new TiledTextLayerView(rows);
    view.linearSetCheck(2, 2, 3, 2, true);
    view.setFragmentLocations([TokenLocation.parse('3.2')]);

    const fl = view.getCheckedLocationAndFragment();

    expect(fl.fragment).toBe(0);
    expect(fl.location).toBeTruthy();
    expect(fl.location.toString()).toBe('2.2-3.2');
  });
});
