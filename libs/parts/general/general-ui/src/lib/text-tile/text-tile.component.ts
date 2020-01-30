import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  ViewChild
} from '@angular/core';
import { TextTile, TEXT_TILE_TEXT_DATA_NAME } from '../tiled-text-part';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cadmus-text-tile',
  templateUrl: './text-tile.component.html',
  styleUrls: ['./text-tile.component.css']
})
export class TextTileComponent implements OnInit {
  private _tile: TextTile;
  private _selectedChangeFrozen: boolean;

  @ViewChild('textInput', { static: false })
  public textElement: ElementRef;

  @Input()
  public get selected(): boolean {
    return this.selector.value;
  }
  public set selected(value: boolean) {
    this._selectedChangeFrozen = true;
    this.selector.setValue(value);
    this._selectedChangeFrozen = false;
  }

  @Input()
  public get tile(): TextTile {
    return this._tile;
  }
  public set tile(value: TextTile) {
    if (this._tile === value) {
      return;
    }
    this._tile = value;
    this.updateForm();
  }
  @Output()
  public tileChange: EventEmitter<TextTile>;
  @Output()
  public editData: EventEmitter<TextTile>;
  @Output()
  public selectedChange: EventEmitter<{selected: boolean, tile: TextTile}>;

  public form: FormGroup;
  public editedText: FormControl;
  public text: string;
  public editing: boolean;
  public selector: FormControl;

  constructor(formBuilder: FormBuilder) {
    // form
    this.editedText = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100)
    ]);
    this.form = formBuilder.group({
      editedText: this.editedText
    });

    this.selector = formBuilder.control(false);

    // events
    this.tileChange = new EventEmitter<TextTile>();
    this.editData = new EventEmitter<TextTile>();
    this.selectedChange = new EventEmitter<{selected: boolean, tile: TextTile}>();
  }

  ngOnInit() {
    this.selector.valueChanges.pipe(distinctUntilChanged())
      .subscribe(_ => {
        if (this._selectedChangeFrozen) {
          return;
        }
        this.selectedChange.emit({
          selected: this.selector.value,
          tile: this.tile
        });
    });
  }

  private updateForm() {
    if (!this._tile) {
      this.form.reset();
      this.text = null;
    } else {
      this.text = this._tile.data[TEXT_TILE_TEXT_DATA_NAME];
      this.editedText.setValue(this.text);
      this.form.markAsPristine();
    }
  }

  public requestDataEdit() {
    this.editData.emit(this.tile);
  }

  public edit() {
    this.editing = true;
    setTimeout(() => {
      this.textElement.nativeElement.focus();
    }, 500);
  }

  public cancel() {
    this.editing = false;
  }

  public save() {
    if (this.form.invalid) {
      return;
    }
    this.text = this.editedText.value.trim();
    this.tile.data[TEXT_TILE_TEXT_DATA_NAME] = this.text;
    this.tileChange.emit(this.tile);
    this.editing = false;
  }
}
