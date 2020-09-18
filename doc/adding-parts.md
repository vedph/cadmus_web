# Adding Parts

When adding parts, you can choose to add them to an existing library, or to a new one. In the latter case, first add the library as specified below.

## Adding a Parts/Fragments Libraries

To add new parts/fragments *libraries*:

- create a new Nrwl Angular library named `<partgroup>-ui` under `parts/<partgroup>` (use simple module name in generator). For instance, for general purpose parts I created `parts/general/general-ui`. This will host dumb components for editing and their demo counterparts.

- create a new Nrwl Angular library named `<partgroup>-feature` under `parts/<partgroup>` (use simple module name in generator). For instance, for general purpose parts I created `parts/general/general-feature`. This will host the pages (features) for each part. Every page wraps the dumb UI component into a component which has a corresponding Akita's state, and gets its data pushed via observables. Also, each page has a route. The app module routes will just include a new route entry, representing the base route for all the routes defined for the new library module: customize it as required. For instance, here is the route to the general parts library:

```ts
{
  path: 'items/:iid/general',
  loadChildren: () =>
    import('@cadmus/parts/general/general-feature').then(
      module => module.GeneralFeatureModule
    ),
  canActivate: [AuthGuardService]
},
```

## Adding Part to the PartGroup-UI Library

In the `<partgroup>-ui` module:

1. add the part _model_ (derived from `Part`), its type ID constant, and its JSON schema constant to `<part>.ts` (e.g. `note-part.ts`). Remember to add the new file to the "barrel" `index.ts` in the module. You can use a template like this (replace `__NAME__` with your part's name, e.g. `Note`, adjusting case where required):

```ts
import { Part } from '@cadmus/core';

/**
 * The __NAME__ part model.
 */
export interface __NAME__Part extends Part {
  // TODO: add properties
}

/**
 * The type ID used to identify the __NAME__Part type.
 */
export const __NAME___PART_TYPEID = 'it.vedph.__NAME__';

/**
 * JSON schema for the __NAME__ part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const __NAME___PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.fusisoft.net/cadmus/parts/general/' + __NAME___PART_TYPEID + '.json',
  type: 'object',
  title: '__NAME__Part',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId'
  ],
  properties: {
    timeCreated: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$'
    },
    creatorId: {
      type: 'string'
    },
    timeModified: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$'
    },
    userId: {
      type: 'string'
    },
    id: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    },
    itemId: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    },
    typeId: {
      type: 'string',
      pattern: '^[a-z][-0-9a-z._]*$'
    },
    roleId: {
      type: ['string', 'null'],
      pattern: '^([a-z][-0-9a-z._]*)?$'
    }

    // TODO: add properties and fill the "required" array as needed
  }
};
```

If you want to infer a schema in the [JSON schema tool](https://jsonschema.net/), which is usually the quickest way of writing the schema, you can use this JSON template, adding your model's properties to it:

```json
{
  "id": "009dcbd9-b1f1-4dc2-845d-1d9c88c83269",
  "itemId": "2c2eadb7-1972-4415-9a43-b8036b6fa685",
  "typeId": "it.vedph.thetype",
  "roleId": null,
  "timeCreated": "2019-11-29T16:48:49.694Z",
  "creatorId": "zeus",
  "timeModified": "2019-11-29T16:48:49.694Z",
  "userId": "zeus",
  "TODO": "add properties here"
}
```

2. add a _part editor dumb component_ named after the part (e.g. `ng g component note-part` for `NotePartComponent` after `NotePart`), and extending `ModelEditorComponentBase<T>` where `T` is the part's type:
   1. in the _constructor_, instantiate its "root" form group (named `form`), filling it with the required controls.
   2. eventually add _thesaurus_ entries properties for binding, populating them by overriding `onThesauriSet` (`protected onThesauriSet() {}`).
   3. implement `OnInit` calling `this.initEditor();` in it.
   4. (from _model to form_): implement `onModelSet` (`protected onModelSet(model: YourModel)`) by calling an `updateForm(model: YourModel)` which either resets the form if the model is falsy, or sets the various form's controls values according to the received model, finally marking the form as pristine.
   5. (from _form to model_): override `getModelFromForm(): YourModel` to get the model from form controls by calling the base class `getModelFromJson`. If this returns null, create a new part object with default values (you just need to set `typeId` for the `Part`'s interface properties); then, fill the part object properties from the form's controls. This merges the inherited properties (from the initial JSON code, if any) with those edited.
   6. build your component's _template_.

Sample code:

```ts
import { Component, OnInit } from '@angular/core';
import { DialogService, ModelEditorComponentBase } from '@cadmus/ui';
import { NotePart, NOTE_PART_TYPEID } from '../..';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ThesaurusEntry } from '@cadmus/core';

/**
 * Note part editor component.
 * Thesauri: optionally provide entries under a "note-tags" thesaurus
 * when you want to use a closed set of tags.
 */
@Component({
  selector: 'cadmus-note-part',
  templateUrl: './note-part.component.html',
  styleUrls: ['./note-part.component.css']
})
export class NotePartComponent extends ModelEditorComponentBase<NotePart>
  implements OnInit {
  public tag: FormControl;
  public tags: FormControl;
  public text: FormControl;

  public tagEntries: ThesaurusEntry[];

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true
  };

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // form
    this.tag = formBuilder.control(null, Validators.maxLength(100));
    this.tags = formBuilder.control([]);
    this.text = formBuilder.control(null, Validators.required);
    this.form = formBuilder.group({
      tag: this.tag,
      tags: this.tags,
      text: this.text
    });
  }

  ngOnInit() {
    this.initEditor();
  }

  private updateForm(model: NotePart) {
    if (!model) {
      this.form.reset();
      return;
    }
    this.tag.setValue(model.tag);
    this.tags.setValue(model.tag);
    this.text.setValue(model.text);
    this.form.markAsPristine();
  }

  protected onModelSet(model: NotePart) {
    this.updateForm(model);
  }

  protected onThesauriSet() {
    const key = 'note-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): NotePart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: NOTE_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        tag: null,
        text: null
      };
    }
    part.tag = this.tagEntries ? this.tags.value : this.tag.value;
    part.text = this.text.value? this.text.value.trim() : null;
    return part;
  }
}
```

```html
<form [formGroup]="form" (submit)="save()">
  <mat-card>
    <mat-card-header>
      <div mat-card-avatar>
        <mat-icon>picture_in_picture</mat-icon>
      </div>
      <mat-card-title>__NAME__ Part</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      TODO: your template here...
    </mat-card-content>
    <mat-card-actions>
      <cadmus-close-save-buttons
        [form]="form"
        [noSave]="userLevel < 2"
        (closeRequest)="close()"
      ></cadmus-close-save-buttons>
    </mat-card-actions>
  </mat-card>
</form>
```

Remember to add the component to its module's `declarations` and `exports`.

3. add a _part editor demo dumb component_ named after the part (e.g. `ng g component note-part-demo` for `NotePartDemoComponent` after `NotePart`). This will essentially be a wrapper of two distinct controls: the part's editor component, and a `JsonEditorResourcesComponent`. These components are mutually connected, so that you can edit the JSON code for the part (and eventually for its thesauri sets) and set the visual editor to it, or vice-versa. Remember to include this component both in the `declarations` and `exports` of its module.

Code template (replace `__NAME__` with your model name, adjusting case as required):

```ts
import { Component, OnInit, Input } from '@angular/core';
import { JsonSchemaService, ThesauriSet } from '@cadmus/core';
import { __NAME___PART_TYPEID, __NAME___PART_SCHEMA } from '../__NAME__-part';

@Component({
  selector: 'cadmus-__NAME__-part-demo',
  templateUrl: './__NAME__-part-demo.component.html',
  styleUrls: ['./__NAME__-part-demo.component.css']
})
export class __NAME__PartDemoComponent implements OnInit {
  private _thesauriJson: string;

  public currentTabIndex: number;
  public schemaName = __NAME___PART_TYPEID;
  public modelJson: string;
  public thesauri: ThesauriSet | null;

  @Input()
  public get thesauriJson(): string {
    return this._thesauriJson;
  }
  public set thesauriJson(value: string) {
    if (this._thesauriJson === value) {
      return;
    }
    this._thesauriJson = value;
    if (value) {
      this.thesauri = JSON.parse(value);
    } else {
      this.thesauri = null;
    }
  }

  constructor(schemaService: JsonSchemaService) {
    this.currentTabIndex = 0;
    schemaService.addSchema(__NAME___PART_TYPEID, __NAME___PART_SCHEMA);
  }

  ngOnInit() {}

  public onCodeSaved() {
    this.currentTabIndex = 1;
  }

  public onEditorSaved() {
    this.currentTabIndex = 0;
  }
}
```

HTML template:

```html
<mat-card>
  <mat-card-header>
    <mat-card-title>
      <h2>__NAME__ Part Editor Demo</h2>
    </mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <!-- note 2-way databinding for selectedIndex: it's a bug in Angular, need it -->
    <mat-tab-group [(selectedIndex)]="currentTabIndex">
      <mat-tab>
        <ng-template mat-tab-label>
          <mat-icon class="tab-icon">code</mat-icon>
          Code
        </ng-template>
        <cadmus-json-editor-resources
          title="__NAME__"
          [schemaName]="schemaName"
          [(modelJson)]="modelJson"
          [(thesauriJson)]="thesauriJson"
          (modelJsonChange)="onCodeSaved()"
          (thesauriJsonChange)="onCodeSaved()"
        ></cadmus-json-editor-resources>
      </mat-tab>
      <mat-tab>
        <ng-template mat-tab-label>
          <mat-icon class="tab-icon">dashboard</mat-icon>
          Editor
        </ng-template>
        <cadmus-__NAME__-part
          [(json)]="modelJson"
          [thesauri]="thesauri"
          (jsonChange)="onEditorSaved()"
          (editorClose)="onEditorSaved()"
        ></cadmus-__NAME__-part>
      </mat-tab>
    </mat-tab-group>
  </mat-card-content>
</mat-card>
```

## Adding Part Demo Feature to the App

1. add a demo page feature in the cadmus app, under its `demo` folder, creating a `feature-<partname>-part-demo` component (e.g. `ng g component feature-note-part-demo -s -t`).

The code template is minimal, including also the HTML template and no CSS; replace `__NAME__` with your model name; you can use `ng g component ... -s -t` to inline the styles and HTML template, [more here](https://github.com/angular/angular-cli/wiki/generate-component):

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'cadmus-feature-__NAME__-part-demo',
  template: `
    <cadmus-__NAME__-part-demo></cadmus-__NAME__-part-demo>
  `,
  styles: []
})
export class Feature__NAME__PartDemoComponent {}
```

2. in its module (`app.module.ts`), add the corresponding route:

```ts
{
  path: 'demo/__NAME__-part',
  component: Feature__NAME__PartDemoComponent,
  pathMatch: 'full'
},
```

3. in its `app.component.html`, add a new entry to the demo menu:

```html
<a mat-menu-item routerLink="/demo/__NAME__-part">__NAME__ part</a>
```

4. in `part-editor-keys.ts`, add the mapping between the part and its group ID, e.g.:

```ts
export const PART_EDITOR_KEYS: PartEditorKeys = {
    // ...
    [BIBLIOGRAPHY_PART_TYPEID]: {
    part: GENERAL
  },
};
```

## Adding Part Feature to the PartGroup-Feature Library

In a `<partgroup>-feature` module:

1. add a _part editor feature component_ named after the part (e.g. `ng g component note-part-feature` for `NotePartFeatureComponent` after `NotePart`), with routing. Ensure that this component is both under the module `declarations` and `exports`. Each editor has its component, and its state management artifacts under the same folder (store, query, and service). Add the corresponding route in the module, e.g.:

```ts
{
  path: `${__NAME___PART_TYPEID}/:pid`,
  pathMatch: 'full',
  component: __NAME__PartFeatureComponent,
  canDeactivate: [PendingChangesGuard]
},
```

2. inside this new component's folder, add a new _store_ for your model, named `edit-<partname>-part.store.ts`. Template:

```ts
import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import {
  EditPartState,
  EditPartStoreApi,
  editPartInitialState
} from '@cadmus/features/edit-state';
// TODO: add import from your UI library
// import { __NAME___PART_TYPEID } from '@cadmus/parts/general/general-ui';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: __NAME___PART_TYPEID })
export class Edit__NAME__PartStore extends Store<EditPartState>
  implements EditPartStoreApi {
  constructor() {
    super(editPartInitialState);
  }

  public setDirty(value: boolean): void {
    this.update({ dirty: value });
  }
  public setSaving(value: boolean): void {
    this.update({ saving: value });
  }
}
```

3. in the same folder, add a new _query_ for your model, named `edit-<partname>-part.query.ts`. Template:

```ts
import { Injectable } from '@angular/core';
import { UtilService } from '@cadmus/core';
import { EditPartQueryBase } from '@cadmus/features/edit-state';
import { Edit__NAME__PartStore } from './edit-__NAME__-part.store';

@Injectable({ providedIn: 'root' })
export class Edit__NAME__PartQuery extends EditPartQueryBase {
  constructor(store: Edit__NAME__PartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
```

4. in the same folder, add a new _service_ for your model, named `edit-<partname>-part.service.ts`. Template:

```ts
import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { Edit__NAME__PartStore } from './edit-__NAME__-part.store';
import { EditPartServiceBase } from '@cadmus/features/edit-state';

@Injectable({ providedIn: 'root' })
export class Edit__NAME__PartService extends EditPartServiceBase {
  constructor(
    editPartStore: Edit__NAME__PartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
```

5. implement the feature editor component by making it extend `EditPartFeatureBase`, like in this code template:

```ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThesauriSet } from '@cadmus/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Edit__NAME__PartService } from './edit-__NAME__-part.service';
import { Edit__NAME__PartQuery } from './edit-__NAME__-part.query';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase
} from '@cadmus/features/edit-state';

@Component({
  selector: 'cadmus-__NAME__-part-feature',
  templateUrl: './__NAME__-part-feature.component.html',
  styleUrls: ['./__NAME__-part-feature.component.css']
})
export class __NAME__PartFeatureComponent extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: Edit__NAME__PartQuery,
    editPartService: Edit__NAME__PartService,
    editItemQuery: EditItemQuery,
    editItemService: EditItemService
  ) {
    super(
      router,
      route,
      snackbar,
      editPartQuery,
      editPartService,
      editItemQuery,
      editItemService
    );
  }

  ngOnInit() {
    // TODO: select your thesauri if required, e.g.:
    // this.initEditor(['note-tags']);
    this.initEditor(['your', 'thesauri', 'ids', 'here']);
  }
}
```

Define the corresponding HTML template like:

```html
<cadmus-current-item-bar></cadmus-current-item-bar>
<cadmus-__NAME__-part
  [itemId]="itemId"
  [roleId]="roleId"
  [json]="json$ | async"
  (jsonChange)="save($event)"
  [thesauri]="thesauri$ | async"
  (editorClose)="close()"
  (dirtyChange)="onDirtyChange($event)"
></cadmus-__NAME__-part>
```
