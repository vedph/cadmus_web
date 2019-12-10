import { Component, OnInit } from '@angular/core';
import { OrthographyFragment } from '../orthography-fragment';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MspValidators } from '../msp-validators';
import { DialogService, ModelEditorComponentBase } from '@cadmus/ui';
import { take } from 'rxjs/operators';
import { diff_match_patch } from 'diff-match-patch';
import {
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/animations';
import { MspOperation } from '../msp-operation';
import { DifferResultToMspAdapter } from '../differ-result-to-msp-adapter';

@Component({
  selector: 'cadmus-orthography-fragment',
  templateUrl: './orthography-fragment.component.html',
  styleUrls: ['./orthography-fragment.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'open',
        style({
          height: '100%'
        })
      ),
      state(
        'close',
        style({
          height: 0
        })
      ),
      transition('open <=> closed', [animate('300ms ease-in')])
    ])
  ]
})
export class OrthographyFragmentComponent
  extends ModelEditorComponentBase<OrthographyFragment>
  implements OnInit {
  private _currentOperationIndex: number;
  private _differ: diff_match_patch;
  private _adapter: DifferResultToMspAdapter;

  public fragment: OrthographyFragment;
  public standard: FormControl;
  public operations: FormArray;
  public currentOperation: MspOperation;

  constructor(private _formBuilder: FormBuilder, dialogService: DialogService) {
    super(dialogService);

    // form
    this.standard = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100)
    ]);
    this.operations = _formBuilder.array([]);
    this.form = _formBuilder.group({
      standard: this.standard,
      operations: this.operations
    });
  }

  ngOnInit() {}

  private updateForm(model: OrthographyFragment) {
    if (!model) {
      this.form.reset();
    } else {
      this.standard.setValue(model.standard);
      if (model.operations) {
        for (let i = 0; i < model.operations.length; i++) {
          this.addOperation(model.operations[i]);
        }
      }
      this.form.markAsPristine();
    }
  }

  protected onModelSet(model: OrthographyFragment) {
    this.fragment = model;
    this.updateForm(model);
  }

  public addOperation(operation: string = null) {
    this.operations.push(
      this._formBuilder.group({
        text: this._formBuilder.control(operation, [
          Validators.required,
          MspValidators.msp
        ])
      })
    );
  }

  public deleteOperation(index: number) {
    this.dialogService
      .confirm('Warning', `Delete operation #${index + 1}?`)
      .pipe(take(1))
      .subscribe((ok: boolean) => {
        if (ok) {
          this.operations.removeAt(index);
        }
      });
  }

  public clearOperations() {
    this.dialogService
      .confirm('Warning', 'Delete all the operations?')
      .pipe(take(1))
      .subscribe((ok: boolean) => {
        if (ok) {
          this.operations.clear();
          this.currentOperationClosed();
        }
      });
  }

  public moveOperationUp(index: number) {
    if (index < 1) {
      return;
    }
    const item = this.operations.controls[index];
    this.operations.removeAt(index);
    this.operations.insert(index - 1, item);
  }

  public moveOperationDown(index: number) {
    if (index + 1 >= this.operations.length) {
      return;
    }
    const item = this.operations.controls[index];
    this.operations.removeAt(index);
    this.operations.insert(index + 1, item);
  }

  public editOperation(index: number) {
    const form = this.operations.at(index) as FormGroup;
    this._currentOperationIndex = index;
    this.currentOperation = MspOperation.parse(form.controls['text'].value);
  }

  public currentOperationSaved(operation: MspOperation) {
    const form = this.operations.at(this._currentOperationIndex) as FormGroup;
    form.controls['text'].setValue(operation.toString());
    this._currentOperationIndex = null;
    this.currentOperation = null;
  }

  public currentOperationClosed() {
    this._currentOperationIndex = null;
    this.currentOperation = null;
  }

  private getOperations(): string[] {
    const ops: string[] = [];

    for (let i = 0; i < this.operations.controls.length; i++) {
      const form = this.operations.at(i) as FormGroup;
      const op = MspOperation.parse(form.controls['text'].value);
      if (op) {
        ops.push(op.toString());
      }
    }

    return ops;
  }

  protected getModelFromForm(): OrthographyFragment {
    const fr: OrthographyFragment = {
      location: this.fragment ? this.fragment.location : null,
      standard: this.standard.value,
      operations: this.getOperations()
    };
    return fr;
  }

  public autoAddOperations() {
    // we must have both A and B text
    if (!this.fragment.baseText || !this.standard.value) {
      return;
    }

    // instantiate the diffing engine if required
    if (!this._differ) {
      this._differ = new diff_match_patch();
      this._adapter = new DifferResultToMspAdapter();
    }

    // set operations
    const result = this._differ.diff_main(
      this.fragment.baseText,
      this.standard.value
    );
    const ops = this._adapter.adapt(result);

    this.operations.clear();
    for (let i = 0; i < ops.length; i++) {
      this.addOperation(ops[i].toString());
    }
  }
}
