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
  LayerPartInfo
} from '@cadmus/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '@cadmus/ui';
import { EditItemQuery, EditItemService, AppQuery } from '@cadmus/features/edit-state';
import { AuthService, FacetService } from '@cadmus/api';
import { PartScopeSetRequest } from '../parts-scope-editor/parts-scope-editor.component';

/**
 * Item editor. This can edit a new or existing item's metadata and parts.
 */
@Component({
  selector: 'cadmus-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {
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
  public flags$: Observable<FlagDefinition[]>;
  public loading$: Observable<boolean>;
  public saving$: Observable<boolean>;
  public deletingPart$: Observable<boolean>;
  public error$: Observable<string>;

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
    private _facetService: FacetService,
    formBuilder: FormBuilder
  ) {
    this.id = this._route.snapshot.params['id'];
    if (this.id === 'new') {
      this.id = null;
    }
    // new part form
    this.newPartType = formBuilder.control(null, Validators.required);
    this.newPart = formBuilder.group({
      newPartType: this.newPartType,
    });
    // item's metadata form
    this.title = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(500)
    ]);
    this.sortKey = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(500)
    ]);
    this.sortKey.disable();
    this.description = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(1000)
    ]);
    this.facet = formBuilder.control(null, Validators.required);
    this.group = formBuilder.control(null, Validators.maxLength(100));
    this.flags = formBuilder.control([]);

    this.metadata = formBuilder.group({
      title: this.title,
      sortKey: this.sortKey,
      description: this.description,
      facet: this.facet,
      group: this.group,
      flags: this.flags
    });
    this.userLevel = 0;
  }

  ngOnInit() {
    // this.user = this._authService.currentUserValue;
    this._authService.currentUser$.subscribe((user: User) => {
      this.user = user;
      this.userLevel = this._authService.getCurrentUserLevel();
    });

    this.item$ = this._query.selectItem();
    this.parts$ = this._query.selectParts();
    this.partGroups$ = this._query.select(state => state.partGroups);
    this.layerPartInfos$ = this._query.select(state => state.layerPartInfos);
    this.facet$ = this._query.selectFacet();
    this.facets$ = this._appQuery.selectFacets();
    this.flags$ = this._appQuery.selectFlags();
    this.loading$ = this._query.selectLoading();
    this.saving$ = this._query.selectSaving();
    this.deletingPart$ = this._query.selectDeletingPart();
    this.error$ = this._query.selectError();

    // update the metadata form when item changes
    this.item$.subscribe(item => {
      this.updateMetadataForm(item);
      this.newPartDefinitions = this.getNewPartDefinitions();
    });

    // load the item (if any) and its lookup
    this._editItemService.load(this.id);
  }

  private getExistingPartTypeAndRoleIds(): { typeId: string, roleId: string}[] {
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
          roleId: part.roleId
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
      if (existingTypeRoleIds.find(tr => {
        return (tr.typeId === def.typeId && tr.roleId === def.roleId);
      })) {
        continue;
      }
      defs.push(def);
    }
    return defs;
  }

  private getFlags(value: number): FlagDefinition[] {
    const flags = this._appQuery.getValue().flags;
    if (!flags) {
      return [];
    }

    const results: FlagDefinition[] = [];

    for (let i = 0; i < 32; i++) {
      // tslint:disable-next-line:no-bitwise
      const n = 1 << i;
      // tslint:disable-next-line:no-bitwise
      if ((n & value) === n) {
        const flag = flags.find(f => {
          return f.id === n;
        });
        if (flag) {
          results.push(flag);
        }
      }
    }
    return results;
  }

  private updateMetadataForm(item: Item) {
    if (!item) {
      this.metadata.reset();
    } else {
      this.title.setValue(item.title);
      this.sortKey.setValue(item.sortKey);
      this.description.setValue(item.description);
      this.facet.setValue(item.facetId);
      this.group.setValue(item.groupId);
      this.flags.setValue(this.getFlags(item.flags));
      this.metadata.markAsPristine();
    }
  }

  // public getPartColor(typeId: string, roleId: string): string {
  //   const state = this._query.getValue();
  //   return this._facetService.getPartColor(typeId, roleId, state?.facet);
  // }

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

  private tryTrim(value: string): string {
    return value ? value.trim() : value;
  }

  public save() {
    if (!this.metadata.valid) {
      return;
    }

    const item = this._query.getValue().item;
    item.title = this.tryTrim(this.title.value);
    item.sortKey = this.sortKey.value;
    item.description = this.tryTrim(this.description.value);
    item.facetId = this.tryTrim(this.facet.value);
    item.groupId = this.tryTrim(this.group.value);

    // flags
    const set: FlagDefinition[] = this.flags.value;
    let flags = 0;
    if (set) {
      set.forEach(d => {
        // tslint:disable-next-line:no-bitwise
        flags |= d.id;
      });
    }
    item.flags = flags;
    this._editItemService.save(item);
  }

  public addPart(def?: PartDefinition) {
    if (!def && this.newPart.valid) {
      return;
    }
    if (!this.id) {
      this._snackbar.open('Please save the item before adding parts', 'OK', {
        duration: 3000
      });
      return;
    }
    const typeId = def? def.typeId : this.newPartType.value.typeId;
    const roleId = def? def.roleId : this.newPartType.value.roleId;

    let route = `/item/${this.id}/${typeId}/new/`;
    route += roleId ? roleId : 'default';
    this._router.navigate([route]);
  }

  public editPart(part: Part) {
    // build the target route to the appropriate part editor
    const route = this._libraryRouteService.buildPartEditorRoute(
      this._query.getValue().facet.partDefinitions,
      part.itemId,
      part.id,
      part.typeId
    );

    // navigate to the editor
    this._router.navigate(
      [route],
      part.roleId
        ? {
            queryParams: {
              rid: part.roleId
            }
          }
        : {}
    );
  }

  public deletePart(part: Part) {
    this._dialogService
      .confirm('Confirm Deletion', `Delete part "${part.typeId}"?`)
      .subscribe(result => {
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
      .subscribe(result => {
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
