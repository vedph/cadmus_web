import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Item,
  PartGroup,
  PartDefinition,
  FacetDefinition,
  FlagDefinition,
  Part,
  LibraryRouteService,
  User,
  LayerPartInfo,
  Thesaurus,
} from '@cadmus/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '@cadmus/ui';
import {
  EditItemQuery,
  EditItemService,
  AppQuery,
} from '@cadmus/features/edit-state';
import { AuthService } from '@cadmus/api';
import { PartScopeSetRequest } from '../parts-scope-editor/parts-scope-editor.component';

/**
 * Item editor. This can edit a new or existing item's metadata and parts.
 */
@Component({
  selector: 'cadmus-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css'],
})
export class ItemEditorComponent implements OnInit {
  public flagDefinitions: FlagDefinition[];

  public id: string;
  public item$: Observable<Item>;
  public parts$: Observable<Part[]>;
  public partGroups$: Observable<PartGroup[]>;
  public layerPartInfos$: Observable<LayerPartInfo[]>;
  public user: User;
  public userLevel: number;
  // lookup data
  public facet$: Observable<FacetDefinition>;
  public newPartDefinitions: PartDefinition[];
  public facets$: Observable<FacetDefinition[]>;
  public loading$: Observable<boolean>;
  public saving$: Observable<boolean>;
  public deletingPart$: Observable<boolean>;
  public error$: Observable<string>;
  public typeThesaurus$: Observable<Thesaurus>;

  // new part form
  public newPartType: FormControl;
  public newPart: FormGroup;
  // item metadata form
  public title: FormControl;
  public sortKey: FormControl;
  public description: FormControl;
  public facet: FormControl;
  public group: FormControl;
  public flags: FormControl;
  public flagChecks: FormArray;
  public metadata: FormGroup;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private _appQuery: AppQuery,
    private _query: EditItemQuery,
    private _editItemService: EditItemService,
    private _libraryRouteService: LibraryRouteService,
    private _dialogService: DialogService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder
  ) {
    this.id = this._route.snapshot.params['id'];
    if (this.id === 'new') {
      this.id = null;
    }
    // new part form
    this.newPartType = _formBuilder.control(null, Validators.required);
    this.newPart = _formBuilder.group({
      newPartType: this.newPartType,
    });
    // item's metadata form
    this.title = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(500),
    ]);
    this.sortKey = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(500),
    ]);
    this.sortKey.disable();
    this.description = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(1000),
    ]);
    this.facet = _formBuilder.control(null, Validators.required);
    this.group = _formBuilder.control(null, Validators.maxLength(100));
    this.flags = _formBuilder.control(0);
    this.flagChecks = _formBuilder.array([]);

    this.metadata = _formBuilder.group({
      title: this.title,
      sortKey: this.sortKey,
      description: this.description,
      facet: this.facet,
      group: this.group,
      flagChecks: this.flagChecks,
    });
    this.userLevel = 0;
  }

  ngOnInit() {
    this._authService.currentUser$.subscribe((user: User) => {
      this.user = user;
      this.userLevel = this._authService.getCurrentUserLevel();
    });

    this.item$ = this._query.selectItem();
    this.parts$ = this._query.selectParts();
    this.partGroups$ = this._query.select((state) => state.partGroups);
    this.layerPartInfos$ = this._query.select((state) => state.layerPartInfos);
    this.facet$ = this._query.selectFacet();
    this.facets$ = this._appQuery.selectFacets();
    // rebuild the flags controls array when flags definitions change
    this._appQuery.selectFlags().subscribe((defs) => {
      this.flagDefinitions = defs;
      this.buildFlagsControls();
    });
    this.typeThesaurus$ = this._appQuery.selectTypeThesaurus();
    this.loading$ = this._query.selectLoading();
    this.saving$ = this._query.selectSaving();
    this.deletingPart$ = this._query.selectDeletingPart();
    this.error$ = this._query.selectError();

    // when flags controls values change, update the flags value
    this.flagChecks.valueChanges.subscribe((_) => {
      this.flags.setValue(this.getFlagsValue());
    });

    // update the metadata form when item changes
    this.item$.subscribe((item) => {
      this.updateMetadataForm(item);
      this.newPartDefinitions = this.getNewPartDefinitions();
    });

    // load the item (if any) and its lookup
    this._editItemService.load(this.id);
  }

  private getExistingPartTypeAndRoleIds(): {
    typeId: string;
    roleId: string;
  }[] {
    const groups = this._query.getValue().partGroups;
    if (!groups) {
      return [];
    }
    const results = [];
    for (let i = 0; i < groups.length; i++) {
      for (let j = 0; j < groups[i].parts.length; j++) {
        const part = groups[i].parts[j];
        results.push({
          typeId: part.typeId,
          roleId: part.roleId,
        });
      }
    }

    return results;
  }

  private getNewPartDefinitions(): PartDefinition[] {
    const facet = this._query.getValue().facet;
    if (!facet) {
      return [];
    }

    const existingTypeRoleIds = this.getExistingPartTypeAndRoleIds();

    const defs: PartDefinition[] = [];
    for (let i = 0; i < facet.partDefinitions.length; i++) {
      const def = facet.partDefinitions[i];
      // exclude layer parts, as these are in the layers tab
      if (def.roleId?.startsWith('fr.')) {
        continue;
      }
      // exclude parts present in the item
      if (
        existingTypeRoleIds.find((tr) => {
          return tr.typeId === def.typeId && tr.roleId === def.roleId;
        })
      ) {
        continue;
      }
      defs.push(def);
    }
    return defs;
  }

  /**
   * Builds the array of flags controls according to the current flags
   * definitions and the current flags value.
   */
  private buildFlagsControls() {
    this.flagChecks.clear();

    for (let i = 0; i < this.flagDefinitions.length; i++) {
      const flagValue = this.flagDefinitions[i].id;
      // tslint:disable-next-line: no-bitwise
      const checked = (this.flags.value & flagValue) !== 0;
      this.flagChecks.push(this._formBuilder.control(checked));
    }
  }

  /**
   * Update the flags controls from the current flags value.
   */
  private updateFlagControls() {
    if (!this.flagDefinitions) {
      return;
    }
    for (let i = 0; i < this.flagDefinitions.length; i++) {
      const flagValue = this.flagDefinitions[i].id;
      // tslint:disable-next-line: no-bitwise
      const checked = (this.flags.value & flagValue) !== 0;
      this.flagChecks.at(i).setValue(checked);
    }
  }

  /**
   * Get the flags value from the flags controls.
   */
  private getFlagsValue(): number {
    let flagsValue = 0;

    for (let i = 0; i < this.flagDefinitions.length; i++) {
      const flagValue = this.flagDefinitions[i].id;
      if (this.flagChecks.at(i).value) {
        // tslint:disable-next-line: no-bitwise
        flagsValue |= flagValue;
      }
    }
    return flagsValue;
  }

  private updateMetadataForm(item: Item) {
    if (!item) {
      this.metadata.reset();
      this.updateFlagControls();
    } else {
      this.title.setValue(item.title);
      this.sortKey.setValue(item.sortKey);
      this.description.setValue(item.description);
      this.facet.setValue(item.facetId);
      this.group.setValue(item.groupId);
      this.flags.setValue(item.flags);
      this.updateFlagControls();

      this.metadata.markAsPristine();
    }
  }

  public getTypeIdName(typeId: string): string {
    const state = this._appQuery.getValue();
    if (!state || !state.typeThesaurus) {
      return typeId;
    }
    const entry = state.typeThesaurus.entries.find((e) => e.id === typeId);
    return entry ? entry.value : typeId;
  }

  public getRoleIdName(roleId: string): string {
    if (!roleId || !roleId.startsWith('fr.')) {
      return roleId;
    }
    return this.getTypeIdName(roleId);
  }

  private tryTrim(value: string): string {
    return value ? value.trim() : value;
  }

  public save() {
    if (!this.metadata.valid) {
      return;
    }

    const item = { ...this._query.getValue().item };
    item.title = this.tryTrim(this.title.value);
    item.sortKey = this.sortKey.value;
    item.description = this.tryTrim(this.description.value);
    item.facetId = this.tryTrim(this.facet.value);
    item.groupId = this.tryTrim(this.group.value);
    item.flags = this.flags.value;
    this._editItemService.save(item);
  }

  public addPart(def?: PartDefinition) {
    if (!def && !this.newPartType.valid) {
      return;
    }
    if (!this.id) {
      this._snackbar.open('Please save the item before adding parts', 'OK', {
        duration: 3000,
      });
      return;
    }
    const typeId = def ? def.typeId : this.newPartType.value.typeId;
    const roleId = def ? def.roleId : this.newPartType.value.roleId;

    const route = this._libraryRouteService.buildPartEditorRoute(
      this.id,
      'new',
      typeId,
      roleId
    );

    // navigate to the editor
    this._router.navigate(
      [route.route],
      route.rid
        ? {
            queryParams: {
              rid: route.rid,
            },
          }
        : {}
    );
  }

  public editPart(part: Part) {
    // build the target route to the appropriate part editor
    const route = this._libraryRouteService.buildPartEditorRoute(
      part.itemId,
      part.id,
      part.typeId,
      part.roleId
    );

    // navigate to the editor
    this._router.navigate(
      [route.route],
      route.rid
        ? {
            queryParams: {
              rid: route.rid,
            },
          }
        : {}
    );
  }

  public deletePart(part: Part) {
    this._dialogService
      .confirm('Confirm Deletion', `Delete part "${part.typeId}"?`)
      .subscribe((result) => {
        if (!result) {
          return;
        }
        this._editItemService.deletePart(part.id);
      });
  }

  public addLayerPart(part: LayerPartInfo) {
    let name = this.getTypeIdName(part.typeId);
    if (part.roleId) {
      name += ' for ' + this.getRoleIdName(part.roleId);
    }
    this._dialogService
      .confirm('Confirm Addition', `Add layer "${name}"?`)
      .subscribe((result) => {
        if (!result) {
          return;
        }
        this._editItemService.addNewLayerPart(
          part.itemId,
          part.typeId,
          part.roleId
        );
      });
  }

  public setPartsScope(request: PartScopeSetRequest) {
    this._editItemService.setPartThesaurusScope(request.ids, request.scope);
  }
}
