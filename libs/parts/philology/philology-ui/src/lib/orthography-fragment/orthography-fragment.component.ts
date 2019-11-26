import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrthographyFragment } from '../models';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MspOperation } from '@cadmus/core';
import { MspValidators } from '../msp-validators';

@Component({
  selector: 'cadmus-orthography-fragment',
  templateUrl: './orthography-fragment.component.html',
  styleUrls: ['./orthography-fragment.component.css']
})
export class OrthographyFragmentComponent implements OnInit {
  private _fragment: OrthographyFragment;
  private _currentOperationIndex: number;

  /**
   * The fragment being edited.
   */
  @Input()
  public get fragment(): OrthographyFragment {
    return this._fragment;
  }
  public set fragment(value: OrthographyFragment) {
    if (this._fragment === value) {
      return;
    }
    this._fragment = value;
    this.updateForm(value);
  }

  public form: FormGroup;
  public standard: FormControl;
  public operations: FormArray;
  public currentOperation: MspOperation;

  @Output()
  public fragmentChange: EventEmitter<OrthographyFragment>;
  @Output()
  public fragmentClose: EventEmitter<any>;

  constructor(private _formBuilder: FormBuilder) {
    // events
    this.fragmentChange = new EventEmitter<OrthographyFragment>();
    this.fragmentClose = new EventEmitter<any>();

    // form
    this.standard = _formBuilder.control(null, Validators.required);
    this.operations = _formBuilder.array([]);
    this.form = _formBuilder.group({
      standard: this.standard,
      operations: this.operations
    });
  }

  ngOnInit() {
  }

  private updateForm(fragment: OrthographyFragment) {
    this.standard.setValue(fragment.standard);
    // TODO: operations
    this.form.markAsPristine();
  }

  public addOperation(operation: string = null) {
    this.operations.push(this._formBuilder.group({
      text: this._formBuilder.control(operation, [
        Validators.required,
        MspValidators.msp
      ])
    }));
  }

  public removeOperation(index: number) {
    this.operations.removeAt(index);
  }

  public clearOperations() {
    this.operations.clear();
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

  public currentOperationCanceled() {
    this._currentOperationIndex = null;
    this.currentOperation = null;
  }

  public currentOperationSaved(operation: MspOperation) {
    const form = this.operations.at(this._currentOperationIndex) as FormGroup;
    form.controls['text'].setValue(operation.toString());
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

  private getFragment(): OrthographyFragment {
    const fr: OrthographyFragment = {
      standard: this.standard.value,
      operations: this.getOperations()
    };
    return fr;
  }

  public close() {
    // TODO: prompt for confirmation if dirty
    if (this.form.dirty) {
      // TODO: prompt
    }
    this.fragmentClose.emit();
  }

  public save() {
    this._fragment = this.getFragment();
    this.fragmentChange.emit({...this._fragment});
  }
}
