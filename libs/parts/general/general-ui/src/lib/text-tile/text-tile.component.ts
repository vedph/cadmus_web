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
  private _checkedChangeFrozen: boolean;

  @ViewChild('textInput', { static: false })
  public textElement: ElementRef;

  @Input()
  public selected: boolean;

  @Input()
  public checkable: boolean;

  @Input()
  public readonly: boolean;

  @Input()
  public color: string;

  @Input()
  public get checked(): boolean {
    return this.checker.value;
  }
  public set checked(value: boolean) {
    this._checkedChangeFrozen = true;
    this.checker.setValue(value);
    this._checkedChangeFrozen = false;
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
  public checkedChange: EventEmitter<{ checked: boolean; tile: TextTile }>;

  public form: FormGroup;
  public editedText: FormControl;
  public text: string;
  public editing: boolean;
  public checker: FormControl;

  constructor(formBuilder: FormBuilder) {
    // form
    this.editedText = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100)
    ]);
    this.form = formBuilder.group({
      editedText: this.editedText
    });

    this.checker = formBuilder.control(false);

    // events
    this.tileChange = new EventEmitter<TextTile>();
    this.editData = new EventEmitter<TextTile>();
    this.checkedChange = new EventEmitter<{
      checked: boolean;
      tile: TextTile;
    }>();
  }

  ngOnInit() {
    this.checker.valueChanges.pipe(distinctUntilChanged()).subscribe(_ => {
      if (this._checkedChangeFrozen || !this.checkable) {
        return;
      }
      this.checkedChange.emit({
        checked: this.checker.value,
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
    if (!this.readonly) {
      this.editData.emit(this.tile);
    }
  }

  public toggleCheckedNonEdit() {
    if (!this.editing && this.checkable) {
      this.checked = !this.checked;
    }
  }

  public edit() {
    if (this.editing || this.readonly) {
      return;
    }
    this.editing = true;
    setTimeout(() => {
      this.textElement.nativeElement.focus();
      this.textElement.nativeElement.select();
    }, 500);
  }

  public requestEditData() {
    if (this.editing || this.readonly) {
      return;
    }
    this.editData.emit(this._tile);
  }

  public cancel() {
    this.editing = false;
  }

  public save() {
    if (this.form.invalid || this.readonly) {
      return;
    }
    this.text = this.editedText.value.trim();
    this.tile.data[TEXT_TILE_TEXT_DATA_NAME] = this.text;
    this.tileChange.emit(this.tile);
    this.editing = false;
  }
}
