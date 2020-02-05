import { TokenLocation, TokenPoint } from '@cadmus/core';
import { TextTileRow } from '@cadmus/parts/general/general-ui';

/**
 * UI state for a text tile.
 */
export interface TextTileUIState {
  checked: boolean;
  frIndex: number;
}

/**
 * UI state for the tiles in a text row.
 */
export interface TextTileRowUIState {
  tiles: TextTileUIState[];
}

/**
 * UI state for a tiled text.
 */
export class TiledTextUIState {
  private _rows: TextTileRowUIState[];

  /**
   * Create a new state from the specified tiled text.
   * @param rows The tiled text rows.
   */
  constructor(rows: TextTileRow[]) {
    // setup rows to reflect the text
    this._rows = [];
    for (let i = 0; i < rows.length; i++) {
      this._rows[i] = {
        tiles: []
      };
      for (let j = 0; j < (rows[i].tiles ? rows[i].tiles.length : 0); j++) {
        this._rows[i].tiles[j] = {
          checked: false,
          frIndex: -1
        };
      }
    }
  }

  /**
   * The internal rows.
   */
  public get rows(): TextTileRowUIState[] {
    return this._rows;
  }

  /**
   * Check whether the tile at the specified coordinates is checked.
   *
   * @param y The tile's y coordinate.
   * @param x The tile's x coordinate.
   */
  public isChecked(y: number, x: number): boolean {
    return this._rows[y - 1].tiles[x - 1].checked;
  }

  /**
   * Get the index of the fragment including the tile at the specified
   * coordinates.
   *
   * @param y The tile's y coordinate.
   * @param x The tile's x coordinate.
   */
  public getFragmentIndex(y: number, x: number): number {
    return this._rows[y - 1].tiles[x - 1].frIndex;
  }

  /**
   * Set the state of all the tiles.
   *
   * @param state The state values to set in each tile's state.
   * @param setChecked True to set the checked property of states.
   * @param setFrIndex True to set the frIndex property of states.
   */
  public setTileState(
    state: TextTileUIState,
    setChecked = true,
    setFrIndex = true
  ) {
    if (!setChecked && !setFrIndex) {
      return;
    }

    for (let i = 0; i < this._rows.length; i++) {
      const row = this._rows[i];

      for (let j = 0; j < row.tiles.length; j++) {
        const newState = { ...row.tiles[j] };
        if (setChecked) {
          newState.checked = state.checked;
        }
        if (setFrIndex) {
          newState.frIndex = state.frIndex;
        }
      }
    }
  }

  /**
   * Set the tiles state corresponding to the fragments locations.
   *
   * @param locations Fragments locations.
   */
  public setFragmentLocations(locations: TokenLocation[]) {
    // reset all the tiles fragment indexes
    this.setTileState({ checked: false, frIndex: -1 }, false, true);

    // set fragment indexes from their locations
    for (let i = 0; i < locations.length; i++) {
      const loc = locations[i];
      if (loc.secondary) {
        for (let y = loc.primary.y; y <= loc.secondary.y; y++) {
          const row = this._rows[y - 1];
          for (
            let x = y === loc.primary.y ? loc.primary.x : 1;
            y === loc.secondary.y
              ? x <= loc.secondary.x
              : x <= row.tiles.length;
            x++
          ) {
            row[x - 1] = { ...row[x - 1], frIndex: i };
          }
        }
      } else {
        this._rows[loc.primary.y - 1].tiles[loc.primary.x - 1].frIndex = i;
      }
    }
  }

  /**
   * Find the coordinates of the first tile having the specified checked state
   * starting from the specified coordinates.
   *
   * @param y The y coordinates to start from.
   * @param x The x coordinates to start from.
   * @param checked True to find checked tiles, false to find unchecked tiles.
   * @param reverse True to find in reverse direction.
   * @returns The coordinates, or null if not found.
   */
  public findFirstCheckedCoords(
    y: number,
    x: number,
    checked: boolean,
    reverse = false
  ): { y: number; x: number } | null {
    if (reverse) {
      let xstart = x;
      while (true) {
        for (let xi = xstart; xi >= 1; xi--) {
          if (this._rows[y - 1].tiles[xi - 1].checked === checked) {
            return {
              y: y,
              x: xi
            };
          }
        }
        if (--y > 0) {
          xstart = this._rows[y - 1].tiles.length;
        } else {
          break;
        }
      }
    } else {
      let xstart = x;
      while (true) {
        for (let xi = xstart; xi <= this._rows[y - 1].tiles.length; xi++) {
          if (this._rows[y - 1].tiles[xi - 1].checked === checked) {
            return {
              y: y,
              x: xi
            };
          }
        }
        if (++y <= this._rows.length) {
          xstart = 1;
        } else {
          break;
        }
      }
    }

    return null;
  }

  /**
   * "Linearly" set the checked state in the specified range of checked tiles.
   *
   * @param y1 The start y coordinate.
   * @param x1 The start x coordinate.
   * @param y2 The end y coordinate (included).
   * @param x2 The end x coordinate (included).
   * @param checked The state to be set.
   */
  public linearSetCheck(
    y1: number,
    x1: number,
    y2: number,
    x2: number,
    checked: boolean
  ) {
    for (let y = y1; y <= y2; y++) {
      const row = this._rows[y - 1];
      for (
        let x = y === y1 ? x1 : 1;
        y === y2 ? x <= x2 : x <= row.tiles.length;
        x++
      ) {
        row.tiles[x - 1] = {
          frIndex: row.tiles[x - 1].frIndex,
          checked: checked
        };
      }
    }
  }

  /**
   * Get the coordinates of the next tile starting from the specified origin
   * tile.
   *
   * @param y The y coordinate of the origin tile.
   * @param x The x coordinate of the origin tile.
   * @param rows The checked states tiles rows.
   * @returns The coordinates or null if no other tiles past origin.
   */
  public getNextTileCoords(
    y: number,
    x: number
  ): { y: number; x: number } | null {
    if (x < this._rows[y - 1].tiles.length) {
      return {
        y: y,
        x: x + 1
      };
    }
    y++;
    while (y <= this._rows.length) {
      if (this._rows[y - 1].tiles.length > 0) {
        return {
          y: y,
          x: 1
        };
      }
      y++;
    }
    return null;
  }

  /**
   * "Linearly" toggle the tiles according to the specified toggle action
   * in the specified set of tiles rows. When users toggle a tile from unchecked
   * to checked, and any other tile was checked, the checked state must be
   * extended so that all the tiles between the newly checked tile and the old
   * one(s) are checked, so that they form a continuous "line", eventually
   * spanning rows. The same inversely applies when un-checking tiles. This
   * ensures that users can select a single range of tiles by toggling at any
   * of its ends.
   *
   * @param y The y coordinate of the tile which was toggled.
   * @param x The x coordinate of the tile which was toggled.
   * @param checked The new checked state after toggling the tile.
   */
  public toggleLinearTileCheck(y: number, x: number, checked: boolean) {
    // if it was checked, it was toggled from unchecked
    if (checked) {
      // find 1st next checked:
      let yx = this.findFirstCheckedCoords(y, x, true);

      // found: extend from it to y,x
      if (yx) {
        this.linearSetCheck(yx.y, yx.x, y, x, true);
        return;
      }

      // not found: find 1st prev checked:
      yx = this.findFirstCheckedCoords(y, x, true, true);

      // found: extend from it to y,x
      if (yx) {
        this.linearSetCheck(yx.y, yx.x, y, x, true);
        return;
      }
      // not found: check y,x
      this._rows[y - 1].tiles[x - 1].checked = true;
    } else {
      // it was toggled from checked:
      // find 1st prev non-checked and set origin (y1,x1) equal to 1 if not found,
      // else to the tile next to the one found. Then uncheck all from origin
      // to y,x.
      let y1: number, x1: number;
      const yx = this.findFirstCheckedCoords(y, x, false, true);
      if (yx) {
        const next = this.getNextTileCoords(yx.y, yx.x);
        if (!next) {
          y1 = y;
          x1 = x;
        } else {
          y1 = next.y;
          x1 = next.x;
        }
      } else {
        y1 = 1;
        x1 = 1;
      }
      this.linearSetCheck(y1, x1, yx.y, yx.x, false);
    }
  }

  /**
   * Get the location of the checked tiles, if any.
   *
   * @returns The location, or null if no tiles are checked.
   */
  public getCheckedLocation(): TokenLocation | null {
    const start = this.findFirstCheckedCoords(1, 1, true);
    if (!start) {
      return null;
    }
    const end = this.findFirstCheckedCoords(start.y, start.x, false);
    return !end || (end.y === start.y && end.x === start.x)
      ? new TokenLocation(new TokenPoint(start.y, start.x))
      : new TokenLocation(
          new TokenPoint(start.y, start.x),
          new TokenPoint(end.y, end.x)
        );
  }

  /**
   * Get the location of the checked tiles, together with the index to the
   * fragment including them (or a part of them). Should the tiles be included
   * in more than 1 fragment, no fragment will be returned.
   *
   * @returns Object with fragment=fragment index or -1, and location=location
   * of checked tiles; or null if no checked tile.
   */
  public getCheckedLocationAndFragment(): {
    fragment: number;
    location: TokenLocation;
  } | null {
    const loc = this.getCheckedLocation();
    if (!loc) {
      return null;
    }
    let y2: number, x2: number;
    if (loc.secondary) {
      y2 = loc.secondary.y;
      x2 = loc.secondary.x;
    } else {
      y2 = loc.primary.y;
      x2 = loc.primary.x;
    }

    let fr = -1;
    for (let y = loc.primary.y; y <= y2; y++) {
      const row = this._rows[y - 1];
      for (
        let x = y === loc.primary.y ? loc.primary.x : 1;
        x <= (y === y2 ? x2 : row.tiles.length);
        x++
      ) {
        if (row.tiles[x - 1].frIndex > -1) {
          if (fr > -1) {
            if (fr !== row.tiles[x - 1].frIndex) {
              return {
                fragment: -1,
                location: loc
              };
            }
          } else {
            fr = row.tiles[x - 1].frIndex;
          }
        }
      }
    }
    return {
      fragment: fr,
      location: loc
    };
  }
}
