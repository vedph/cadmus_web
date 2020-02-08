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
  ThesaurusEntry,
  User
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
import { EditItemQuery, EditItemService } from '@cadmus/features/edit-state';
import { AuthService } from '@cadmus/api';

@Component({
  selector: 'cadmus-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {
  public id: string;
  public item$: Observable<Item>;
  public partGroups$: Observable<PartGroup[]>;
  public user: User;
  // lookup data
  public facetParts$: Observable<PartDefinition[]>;
  public facets$: Observable<FacetDefinition[]>;
  public flags$: Observable<FlagDefinition[]>;
  public loading$: Observable<boolean>;
  public saving$: Observable<boolean>;
  public deletingPart$: Observable<boolean>;
  public error$: Observable<string>;

  // new part form
  public partType: FormControl;
  public partRole: FormControl;
  public newPart: FormGroup;
  // item metadata form
  public title: FormControl;
  public sortKey: FormControl;
  public description: FormControl;
  public facet: FormControl;
  public flags: FormControl;
  public metadata: FormGroup;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private _query: EditItemQuery,
    private _editItemService: EditItemService,
    private _libraryRouteService: LibraryRouteService,
    private _dialogService: DialogService,
    private _authService: AuthService,
    formBuilder: FormBuilder
  ) {
    this.id = this._route.snapshot.params['id'];
    if (this.id === 'new') {
      this.id = null;
    }
    // new part form
    this.partType = formBuilder.control(null, Validators.required);
    this.partRole = formBuilder.control(null, Validators.maxLength(100));
    this.newPart = formBuilder.group({
      partType: this.partType,
      partRole: this.partRole
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
    this.flags = formBuilder.control([]);

    this.metadata = formBuilder.group({
      title: this.title,
      sortKey: this.sortKey,
      description: this.description,
      facet: this.facet,
      flags: this.flags
    });
  }

  ngOnInit() {
    this.user = this._authService.currentUserValue;
    this._authService.currentUser$.subscribe((user: User) => {
      this.user = user;
    });

    this.item$ = this._query.select(state => state.item);
    this.partGroups$ = this._query.select(state => state.partGroups);
    this.facetParts$ = this._query.select(state => state.facetParts);
    this.facets$ = this._query.select(state => state.facets);
    this.flags$ = this._query.select(state => state.flags);
    this.loading$ = this._query.selectLoading();
    this.saving$ = this._query.selectSaving();
    this.deletingPart$ = this._query.selectDeletingPart();
    this.error$ = this._query.selectError();

    // update the metadata form when item changes
    this.item$.subscribe(item => {
      this.updateMetadataForm(item);
    });

    // load the item (if any) and its lookup
    this._editItemService.load(this.id);
  }

  private getFlags(value: number): FlagDefinition[] {
    const flags = this._query.getValue().flags;
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
      this.flags.setValue(this.getFlags(item.flags));
      this.metadata.markAsPristine();
    }
  }

  public getPartColor(typeId: string, roleId: string): string {
    const state = this._query.getValue();
    let def: PartDefinition = null;
    if (state) {
      def = state.facetParts.find(d => {
        return d.typeId === typeId && (!roleId || roleId === d.roleId);
      });
      if (!def) {
        def = state.facetParts.find(d => {
          return d.typeId === typeId;
        });
      }
    }
    return def ? '#' + def.colorKey : '#f0f0f0';
  }

  public getTypeIdName(typeId: string): string {
    const state = this._query.getValue();
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

  public addPart() {
    if (this.newPart.valid) {
      return;
    }
    if (!this.id) {
      this._snackbar.open('Please save the item before adding parts', 'OK', {
        duration: 3000
      });
      return;
    }
    let route = `/item/${this.id}/${this.partType.value}/new/`;
    route += this.partRole.value ? this.partRole.value : 'default';
    this._router.navigate([route]);
  }

  public editPart(part: Part) {
    // build the target route to the appropriate part editor
    const route = this._libraryRouteService.buildPartEditorRoute(
      this._query.getValue().facetParts,
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
}
