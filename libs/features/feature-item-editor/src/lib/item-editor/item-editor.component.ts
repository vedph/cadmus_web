import { Component, OnInit } from '@angular/core';
import { ItemEditorService } from '../services/item-editor.service';
import { ItemQuery } from '../state/item.query';
import { Observable } from 'rxjs';
import {
  Item,
  PartGroup,
  PartDefinition,
  FacetDefinition,
  FlagDefinition,
  Part
} from '@cadmus/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ItemService } from '@cadmus/api';
import { DialogService } from '@cadmus/ui';

@Component({
  selector: 'cadmus-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {
  public id: string;
  public item$: Observable<Item>;
  public partGroups$: Observable<PartGroup[]>;
  // lookup data
  public facetParts$: Observable<PartDefinition[]>;
  public facets$: Observable<FacetDefinition[]>;
  public flags$: Observable<FlagDefinition[]>;
  public loading$: Observable<boolean>;
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
  public itemFlags: FormControl;
  public metadata: FormGroup;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private _query: ItemQuery,
    private _itemService: ItemService,
    private _dialogService: DialogService,
    private _itemEditorService: ItemEditorService,
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
    this.description = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(1000)
    ]);
    this.facet = formBuilder.control(null, Validators.required);
    this.itemFlags = formBuilder.control(null);

    this.metadata = formBuilder.group({
      title: this.title,
      sortKey: this.sortKey,
      description: this.description,
      facet: this.facet,
      flags: this.itemFlags
    });
  }

  ngOnInit() {
    this.item$ = this._query.select(state => state.item);
    this.partGroups$ = this._query.select(state => state.partGroups);
    this.facetParts$ = this._query.select(state => state.facetParts);
    this.facets$ = this._query.select(state => state.facets);
    this.flags$ = this._query.select(state => state.flags);
    this.loading$ = this._query.selectLoading();
    this.error$ = this._query.selectError();
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
    const set: FlagDefinition[] = this.itemFlags.value;
    let flags = 0;
    if (set) {
      set.forEach(d => {
        // tslint:disable-next-line:no-bitwise
        flags |= d.id;
      });
    }
    item.flags = flags;

    // TODO save item

    // this._itemService.addItem(this.item).subscribe(
    //   item => {
    //     this.metadata.markAsPristine();
    //     this.item = item;
    //     this.id = item.id;
    //     this.updateForm();
    //     this._snackbar.open('Item metadata saved successfully', 'OK', {
    //       duration: 2000
    //     });
    //   },
    //   error => {
    //     console.error(error);
    //     this._snackbar.open('Error saving item metadata', 'OK');
    //   },
    //   () => {
    //     this.busy = false;
    //   }
    // );
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
    // determine if the selected part is a text layer part
    const def = this._query
      .getValue()
      .facetParts.find(p => p.typeId === part.typeId);
    const isLayer = def && part.roleId && part.roleId.startsWith('fr.');

    // build the target route to the appropriate part editor
    let route: string;
    const extras: any = {};
    if (isLayer) {
      route = `/item/${part.itemId}/text-layer/${part.id}/`;
      const frTypeRole = this._itemService.getFragmentTypeAndRole(part.roleId);
      route += frTypeRole[1] ? frTypeRole[1] : 'default';
      extras.queryParams = {};
      extras.queryParams.frType = frTypeRole[0];
    } else {
      route = `/item/${part.itemId}/${part.typeId}/${part.id}/`;
      route += part.roleId ? part.roleId : 'default';
    }

    // navigate to the editor
    this._router.navigate([route], extras);
  }

  public deletePart(part: Part) {
    this._dialogService
      .confirm('Confirm Deletion', `Delete part "${part.typeId}"?`)
      .subscribe(result => {
        if (!result) {
          return;
        }
        // TODO: delete part part.id
        // this.busy = true;
        // this._itemService.deletePart(part.id).subscribe(
        //   () => {
        //     this.loadItem();
        //   },
        //   error => {
        //     console.error(error);
        //     this.busy = false;
        //     this._snackbar.open(error, 'OK', { duration: 3000 });
        //   },
        //   () => {
        //     this.busy = false;
        //   }
        // );
      });
  }
}
