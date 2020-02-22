import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LayerHint } from '@cadmus/core';
import { DialogService } from '../../services/dialog.service';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'cadmus-layer-hints',
  templateUrl: './layer-hints.component.html',
  styleUrls: ['./layer-hints.component.css']
})
export class LayerHintsComponent implements OnInit {
  private _hints: LayerHint[];

  @Input()
  public get hints(): LayerHint[] {
    return this._hints;
  }
  public set hints(value: LayerHint[]) {
    this._hints = value || [];
    this.checks.controls = [];
    for (let i = 0; i < this._hints.length; i++) {
      this.checks.push(this._formBuilder.control(false));
    }
  }

  @Input()
  public targetLocation: string;
  @Input()
  public disabled: boolean;
  @Output()
  public requestEdit: EventEmitter<LayerHint>;
  @Output()
  public requestDelete: EventEmitter<LayerHint>;
  @Output()
  public requestMove: EventEmitter<LayerHint>;
  @Output()
  public requestPatch: EventEmitter<string[]>;

  public form: FormGroup;
  public checks: FormArray;
  public patchCheck: FormControl;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    this.requestEdit = new EventEmitter<LayerHint>();
    this.requestDelete = new EventEmitter<LayerHint>();
    this.requestMove = new EventEmitter<LayerHint>();
    this.requestPatch = new EventEmitter<string[]>();
    this._hints = [];

    this.checks = _formBuilder.array([]);
    this.patchCheck = _formBuilder.control(0, Validators.min(1));
    this.form = _formBuilder.group({
      checks: this.checks,
      patchCheck: this.patchCheck
    });
  }

  ngOnInit(): void {}

  public emitRequestEdit(hint: LayerHint) {
    this.requestEdit.emit(hint);
  }

  public emitRequestDelete(hint: LayerHint) {
    this._dialogService
      .confirm('Confirm Deletion', `Delete fragment at "${hint.location}"?`)
      .subscribe((ok: boolean) => {
        if (ok) {
          this.requestDelete.emit(hint);
        }
      });
  }

  public emitRequestMove(hint: LayerHint) {
    if (!this.targetLocation) {
      return;
    }
    this._dialogService
      .confirm(
        'Confirm Move',
        `Move fragment at ${hint.location} to ${this.targetLocation}?`
      )
      .subscribe((ok: boolean) => {
        if (ok) {
          this.requestMove.emit(hint);
        }
      });
  }

  public emitRequestPatch() {
    if (this.form.invalid) {
      return;
    }
    this._dialogService
      .confirm('Confirm Patch', `Patch the selected fragments?`)
      .subscribe((ok: boolean) => {
        if (ok) {
          const patches: string[] = [];
          for (let i = 0; i < this.checks.controls.length; i++) {
            const n = this.checks.controls[i].value;
            if (n) {
              patches.push(this._hints[n - 1].patchOperation);
            }
          }
          this.requestPatch.emit(patches);
        }
      });
  }
}
