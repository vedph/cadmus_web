import { TokenLocation, TokenPoint } from '@cadmus/core';
import { TextTileRow, TextTile } from '@cadmus/parts/general/general-ui';

/**
 * The layer view model for a text tile.
 */
export interface TextTileLayerView {
  checked: boolean;
  frIndex: number;
  model: TextTile;
}

/**
 * The layer view model for a row of text tiles.
 */
export interface TextTileRowLayerView {
  tiles: TextTileLayerView[];
}

/**
 * The layer view model for a tiled text.
 */
export class TiledTextLayerView {
  private _rows: TextTileRowLayerView[];

  /**
   * Create a new view from the specified tiled text.
   * @param rows The tiled text rows.
   */
  constructor(rows: TextTileRow[]) {
    // setup rows to reflect the text
    this._rows = [];

    if (rows) {
      // for each row
      for (let i = 0; i < rows.length; i++) {
        this._rows[i] = {
          tiles: []
        };
        // for each tile in row
        for (let j = 0; j < (rows[i].tiles ? rows[i].tiles.length : 0); j++) {
          this._rows[i].tiles[j] = {
            checked: false,
            frIndex: -1,
            model: rows[i].tiles[j]
          };
        }
      }
    }
  }

  /**
   * The internal rows view models.
   */
  public get rows(): TextTileRowLayerView[] {
    return this._rows;
  }

  /**
   * Get the tile at the specified coordinates.
   *
   * @param y The tile's y coordinate.
   * @param x The tile's x coordinate.
   */
  public getTileAt(y: number, x: number) {
    return this._rows[y - 1].tiles[x - 1];
  }

  /**
   * Set the view state of all the tiles.
   *
   * @param state The state values to set in each tile's state.
   * @param setChecked True to set the checked property of states.
   * @param setFrIndex True to set the frIndex property of states.
   */
  public setAllTilesViewState(state: { checked?: boolean; frIndex?: number }) {
    const hasChecked = state.hasOwnProperty('checked');
    const hasFrIndex = state.hasOwnProperty('frIndex');
    if (!hasChecked && !hasFrIndex) {
      return;
    }

    // for each row
    for (let i = 0; i < this._rows.length; i++) {
      const row = this._rows[i];

      // for each tile in row
      for (let j = 0; j < row.tiles.length; j++) {
        const tile = row.tiles[j];

        row.tiles[j] = {
          checked: hasChecked ? state.checked : tile.checked,
          frIndex: hasFrIndex ? state.frIndex : tile.frIndex,
          model: tile.model
        };
      }
    }
  }

  /**
   * Set the fragment index of each tile in this view. This is equal to the
   * index to the fragment including the tile, when the tile is inside that
   * fragment, or to -1, when the tile is outside any fragment. Fragment indexes
   * refer to their locations, as received by this function.
   *
   * @param locations Fragments locations.
   */
  public setFragmentLocations(locations: TokenLocation[]) {
    // reset all the tiles fragment indexes
    this.setAllTilesViewState({ frIndex: -1 });

    // for each fragment's location
    for (let i = 0; i < locations.length; i++) {
      const loc = locations[i];

      if (loc.secondary) {
        // range
        for (let y = loc.primary.y; y <= loc.secondary.y; y++) {
          const row = this._rows[y - 1];
          for (
            let x = y === loc.primary.y ? loc.primary.x : 1;
            y === loc.secondary.y
              ? x <= loc.secondary.x
              : x <= row.tiles.length;
            x++
          ) {
            const tile = row.tiles[x - 1];
            row.tiles[x - 1] = {
              checked: tile.checked,
              frIndex: i,
              model: tile.model
            };
          }
        }
      } else {
        // point
        const tile = this.getTileAt(loc.primary.y, loc.primary.x);
        this._rows[loc.primary.y - 1].tiles[loc.primary.x - 1] = {
          checked: tile.checked,
          frIndex: i,
          model: tile.model
        };
      }
    }
  }

  /**
   * Find the coordinates of the first tile having the specified checked state,
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
          if (this.getTileAt(y, xi).checked === checked) {
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
          if (this.getTileAt(y, xi).checked === checked) {
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
        const tile = row.tiles[x - 1];
        row.tiles[x - 1] = {
          frIndex: tile.frIndex,
          checked: checked,
          model: tile.model
        };
      }
    }
  }

  /**
   * Get the coordinates of the next tile starting from the specified origin
   * tile. The next tile is the tile to the right of the origin tile in the
   * same row, or the first tile of the next row (if any) when the origin is
   * the last tile in its row.
   *
   * @param y The y coordinate of the origin tile.
   * @param x The x coordinate of the origin tile.
   * @returns The coordinates, or null if no other tiles after origin.
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
   * Get the coordinates of the previous tile starting from the specified origin
   * tile. The previous tile is the tile to the left of the origin tile in the
   * same row, or the last tile of the previous row (if any) when the origin is
   * the first tile in its row.
   *
   * @param y The y coordinate of the origin tile.
   * @param x The x coordinate of the origin tile.
   * @returns The coordinates, or null if no other tiles before origin.
   */
  public getPrevTileCoords(
    y: number,
    x: number
  ): { y: number; x: number } | null {
    if (x > 1) {
      return {
        y: y,
        x: x - 1
      };
    }
    y--;
    while (y > 0) {
      if (this._rows[y - 1].tiles.length > 0) {
        return {
          y: y,
          x: this._rows[y - 1].tiles.length
        };
      }
      y--;
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
      const tile = this.getTileAt(y, x);
      this._rows[y - 1].tiles[x - 1] = {
        checked: true,
        frIndex: tile.frIndex,
        model: tile.model
      };
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
   * Get the location of the checked tiles, if any. As tiles are checked
   * only as an uninterrupted sequence, there can be only 0 or 1 location
   * in a set.
   *
   * @returns The location, or null if no tiles are checked.
   */
  public getCheckedLocation(): TokenLocation | null {
    const start = this.findFirstCheckedCoords(1, 1, true);
    if (!start) {
      return null;
    }
    const end = this.findFirstCheckedCoords(start.y, start.x, false);
    if (!end || (end.y === start.y && end.x === start.x)) {
      return;
    }
    const last = this.getPrevTileCoords(end.y, end.x);
    return last.y === start.y && last.x === start.x
      ? new TokenLocation(new TokenPoint(start.y, start.x))
      : new TokenLocation(
          new TokenPoint(start.y, start.x),
          new TokenPoint(last.y, last.x)
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
