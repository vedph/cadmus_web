import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Part } from '@cadmus/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { CustomValidators, DialogService } from '@cadmus/ui';
import { FacetService } from '@cadmus/api';
import { EditItemQuery, AppQuery } from '@cadmus/features/edit-state';

export interface PartScopeSetRequest {
  ids: string[];
  scope: string;
}

/**
 * Parts thesaurus scope dumb editor component.
 * This is used to set the thesaurus scope of multiple item's parts at once
 * in the item editor.
 */
@Component({
  selector: 'cadmus-parts-scope-editor',
  templateUrl: './parts-scope-editor.component.html',
  styleUrls: ['./parts-scope-editor.component.css']
})
export class PartsScopeEditorComponent implements OnInit {
  private _parts: Part[];

  @Input()
  public get parts(): Part[] {
    return this._parts;
  }
  public set parts(value: Part[]) {
    this._parts = value;
    this.updateForm();
  }

  @Input()
  public readonly: boolean;

  @Output()
  public setScopeRequest: EventEmitter<PartScopeSetRequest>;

  public checks: FormArray;
  public scope: FormControl;
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _facetService: FacetService,
    private _dialogService: DialogService,
    private _appQuery: AppQuery,
    private _itemQuery: EditItemQuery) {
    // events
    this.setScopeRequest = new EventEmitter<PartScopeSetRequest>();
    // form
    this.checks = _formBuilder.array([], CustomValidators.minChecked(1));
    this.scope = _formBuilder.control(null, [
      Validators.maxLength(50),
      Validators.pattern(/^[-a-zA-Z0-9_]+$/)
    ]);
    this.form = _formBuilder.group({
      checks: this.checks,
      scope: this.scope
    });
  }

  ngOnInit(): void {}

  private updateForm() {
    this.checks.clear();
    if (!this._parts || this._parts.length === 0) {
      return;
    }

    for (let i = 0; i < this._parts.length; i++) {
      this.checks.push(this._formBuilder.control(false));
    }
  }

  public getPartColor(typeId: string, roleId: string): string {
    const state = this._itemQuery.getValue();
    return this._facetService.getPartColor(typeId, roleId, state?.facet);
  }

  public getTypeIdName(typeId: string): string {
    const state = this._appQuery.getValue();
    if (!state || !state.typeThesaurus) {
      return typeId;
    }
    const entry = state.typeThesaurus.entries.find(e => e.id === typeId);
    return entry ? entry.value : typeId;
  }

  public getRoleIdName(roleId: string): string {
    if (!roleId || !roleId.startsWith('fr.')) {
      return roleId;
    }
    return this.getTypeIdName(roleId);
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }
    const ids: string[] = [];
    for (let i = 0; i < this.checks.length; i++) {
      if (this.checks.controls[i].value === true) {
        ids.push(this._parts[i].id);
      }
    }

    let msg = this.scope.value
      ? `Assign scope "${this.scope.value}" to ${ids.length} part`
      : `Remove scope from ${ids.length} part`;
    msg += ids.length > 1? 's?' : '?';

    this._dialogService
    .confirm('Confirm Scopes', msg)
    .subscribe(result => {
      if (!result) {
        return;
      }
      this.setScopeRequest.emit({
        ids: ids,
        scope: this.scope.value
      });
    });
  }
}
