import { Component, OnInit } from '@angular/core';
import { DialogService, ModelEditorComponentBase } from '@cadmus/ui';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import {
  TiledTextPart,
  TextTileRow,
  TILEDTEXTPART_TYPEID,
  TEXT_TILE_TEXT_DATA_NAME,
  TextTile
} from '../tiled-text-part';
import { AuthService } from '@cadmus/api';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface Data {
  [key: string]: any;
}

@Component({
  selector: 'cadmus-tiled-text-part',
  templateUrl: './tiled-text-part.component.html',
  styleUrls: ['./tiled-text-part.component.css']
})
export class TiledTextPartComponent
  extends ModelEditorComponentBase<TiledTextPart>
  implements OnInit {
  private _editedDataTile: TextTile;
  private _editedDataRow: TextTileRow;

  public selectedTile: TextTile;
  public form: FormGroup;
  public citation: FormControl;
  public rows: TextTileRow[];
  public editedData: Data;
  public editedDataTitle: string;
  public currentTabIndex: number;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.currentTabIndex = 0;
    // form
    this.citation = formBuilder.control(null, Validators.maxLength(1000));
    this.form = formBuilder.group({
      citation: this.citation
    });
  }

  ngOnInit() {
    this.initEditor();
  }

  private updateForm(model: TiledTextPart) {
    if (!model) {
      this.form.reset();
      this.rows = [];
      return;
    }
    this.citation.setValue(model.citation);
    this.rows = model.rows || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: TiledTextPart): void {
    this.updateForm(model);
  }

  /**
   * Recalculate the coordinates of all the tiles in this set,
   * according to the tiles position.
   */
  private adjustCoords() {
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      row.y = i + 1;
      if (row.tiles) {
        for (let j = 0; j < row.tiles.length; j++) {
          row.tiles[j].x = j + 1;
        }
      }
    }
  }

  protected getModelFromForm(): TiledTextPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: null,
        id: null,
        typeId: TILEDTEXTPART_TYPEID,
        roleId: null,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        citation: null,
        rows: []
      };
    }
    // ensure that form's coordinates are ok
    this.adjustCoords();
    // set part's citation and rows
    part.citation = this.citation.value ? this.citation.value.trim() : null;
    part.rows = this.rows;
    return part;
  }

  /**
   * Append a new row at the bottom.
   */
  public addRow() {
    const data = {};
    data[TEXT_TILE_TEXT_DATA_NAME] = 'text1';

    this.rows.push({
      y: this.rows.length + 1,
      tiles: [
        {
          x: 1,
          data: data
        }
      ]
    });
    this.form.markAsDirty();
  }

  /**
   * Append a new tile at the end of the specified row.
   * @param row The row to add the tile to.
   */
  public addTile(row: TextTileRow) {
    const x = row.tiles ? row.tiles.length + 1 : 1;
    const data = {};
    data[TEXT_TILE_TEXT_DATA_NAME] = 'text' + x;
    if (!row.tiles) {
      row.tiles = [];
    }
    row.tiles.push({
      x: x,
      data: data
    });
    this.form.markAsDirty();
  }

  /**
   * Delete the selected tile, if any.
   */
  public deleteSelectedTile() {
    if (!this.selectedTile) {
      return;
    }

    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      if (row.tiles) {
        const index = row.tiles.indexOf(this.selectedTile);
        if (index > -1) {
          this.selectedTile =
            index + 1 < row.tiles.length
              ? row.tiles[index + 1]
              : row.tiles.length > 1
              ? row.tiles[index - 1]
              : null;
          row.tiles.splice(index, 1);
          this.adjustCoords();
          this.form.markAsDirty();
          break;
        }
      }
    }
  }

  /**
   * Delete the row at the specified index.
   * @param rowIndex The row's index.
   */
  public deleteRow(rowIndex: number) {
    this._dialogService
      .confirm('Confirm Deletion', `Delete row #"${rowIndex + 1}"?`)
      .subscribe((ok: boolean) => {
        if (!ok) {
          return;
        }
        this.rows.splice(rowIndex, 1);
        this.adjustCoords();
        this.form.markAsDirty();
      });
  }

  /**
   * Move the row at the specified index up.
   * @param rowIndex The row index.
   */
  public moveRowUp(rowIndex: number) {
    if (rowIndex < 1) {
      return;
    }
    moveItemInArray(this.rows, rowIndex, rowIndex - 1);
    this.adjustCoords();
    this.form.markAsDirty();
  }

  /**
   * Move the row at the specified index down.
   * @param rowIndex The row index.
   */
  public moveRowDown(rowIndex: number) {
    if (rowIndex + 1 === this.rows.length) {
      return;
    }
    moveItemInArray(this.rows, rowIndex, rowIndex + 1);
    this.adjustCoords();
    this.form.markAsDirty();
  }

  public drop(event: CdkDragDrop<TextTile[]>, row: TextTileRow) {
    // https://material.angular.io/cdk/drag-drop/overview
    moveItemInArray(row.tiles, event.previousIndex, event.currentIndex);
    this.adjustCoords();
    this.form.markAsDirty();
  }

  public onTileChange(tile: TextTile) {
    this.form.markAsDirty();
  }

  public editRowData(row: TextTileRow) {
    this._editedDataRow = row;
    this._editedDataTile = null;
    this.editedDataTitle = `Row ${row.y}`;
    this.editedData = row.data;
    this.currentTabIndex = 1;
  }

  public editTileData(tile: TextTile) {
    this._editedDataTile = tile;
    this._editedDataRow = null;
    this.editedDataTitle = `Tile ${this.getTileCoords(tile)}`;
    this.editedData = tile.data;
    this.currentTabIndex = 1;
  }

  public closeDataEditor() {
    this.currentTabIndex = 0;
    this._editedDataRow = null;
    this.editedDataTitle = null;
    this.editedData = null;
  }

  public saveEditedData(data: Data) {
    if (this._editedDataTile) {
      this._editedDataTile.data = data;
    } else {
      this._editedDataRow.data = data;
    }
    this.form.markAsDirty();
    this.closeDataEditor();
  }

  public getTileCoords(tile: TextTile = null): string {
    if (!tile) {
      tile = this.selectedTile;
    }
    if (!tile) {
      return '';
    } else {
      let y = 0;
      for (let i = 0; i < this.rows.length; i++) {
        if (this.rows[i].tiles.indexOf(tile) > -1) {
          y = i + 1;
          break;
        }
      }
      return `${y},${tile.x}`;
    }
  }
}
