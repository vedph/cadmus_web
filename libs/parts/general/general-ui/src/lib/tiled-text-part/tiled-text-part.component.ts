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

@Component({
  selector: 'cadmus-tiled-text-part',
  templateUrl: './tiled-text-part.component.html',
  styleUrls: ['./tiled-text-part.component.css']
})
export class TiledTextPartComponent
  extends ModelEditorComponentBase<TiledTextPart>
  implements OnInit {
  private _editedDataOwner: TextTile | TextTileRow;

  public selectedTile: TextTile;
  public form: FormGroup;
  public citation: FormControl;
  public rowCount: FormControl;
  public rows: TextTileRow[];
  public editedData: {[key: string]: any};
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
    this.citation = formBuilder.control(null);
    this.rowCount = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      citation: this.citation,
      rowCount: this.rowCount
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
    this.rowCount.setValue(model.rows ? model.rows.length : 0);
    this.rows = model.rows || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: TiledTextPart): void {
    this.updateForm(model);
  }

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
    this.adjustCoords();
    part.citation = this.citation.value ? this.citation.value.trim() : null;
    part.rows = this.rows;
    return part;
  }

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
    this.rowCount.setValue(this.rows.length);
  }

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
  }

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
          break;
        }
      }
    }
  }

  public deleteRow(rowIndex: number) {
    this._dialogService
      .confirm('Confirm Deletion', `Delete row #"${rowIndex + 1}"?`)
      .subscribe((ok: boolean) => {
        if (!ok) {
          return;
        }
        this.rows.splice(rowIndex, 1);
        this.adjustCoords();
        this.rowCount.setValue(this.rows.length);
      });
  }

  public moveRowUp(rowIndex: number) {
    if (rowIndex < 1) {
      return;
    }
    moveItemInArray(this.rows, rowIndex, rowIndex - 1);
    this.adjustCoords();
  }

  public moveRowDown(rowIndex: number) {
    if (rowIndex + 1 === this.rows.length) {
      return;
    }
    moveItemInArray(this.rows, rowIndex, rowIndex + 1);
    this.adjustCoords();
  }

  public drop(event: CdkDragDrop<TextTile[]>, row: TextTileRow) {
    // https://material.angular.io/cdk/drag-drop/overview
    moveItemInArray(row.tiles, event.previousIndex, event.currentIndex);
    this.adjustCoords();
  }

  public editRowData(row: TextTileRow) {
    this._editedDataOwner = row;
    this.editedDataTitle = `Row ${row.y}`;
    this.editedData = row.data;
    this.currentTabIndex = 1;
  }

  public editTileData(tile: TextTile) {
    this._editedDataOwner = tile;
    this.editedDataTitle = `Tile ${tile.x}`;
    this.editedData = tile.data;
    this.currentTabIndex = 1;
  }
}
