# Adding Fragments

## Adding a Parts/Fragments Libraries

Same as [parts](adding-parts.md).

## Adding Fragment to the PartGroup-UI Library

In the `<partgroup>-ui` module:

1. add the fragment _model_ (derived from `Fragment`), its type ID constant, and its JSON schema constant to `<fragment>.ts` (e.g. `comment-fragment.ts`). Remember to add the new file to the "barrel" `index.ts` in the module. You can use a template like this (replace `__NAME__` with your part's name, e.g. `Comment`, adjusting case where required):

```ts
import { Fragment } from '@cadmus/core';

/**
 * The __NAME__ layer fragment server model.
 */
export interface __NAME__Fragment extends Fragment {
  // TODO: add properties
}

export const __NAME___FRAGMENT_TYPEID = 'fr.net.fusisoft.__NAME__';

export const __NAME___FRAGMENT_SCHEMA = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.fusisoft.net/cadmus/fragments/general/' + __NAME___FRAGMENT_TYPEID + '.json',
  type: 'object',
  title: '__NAME__Fragment',
  // TODO: add which properties are required
  required: ['location'],
  properties: {
    location: {
      $id: '#/properties/location',
      type: 'string'
    },
    baseText: {
      $id: '#/properties/baseText',
      type: 'string'
    },
    // TODO: add properties
  }
};
```

If you want to infer a schema in the [JSON schema tool](https://jsonschema.net/), which is usually the quickest way of writing the schema, you can use this JSON template adding your model's properties to it:

```json
{
  "location": "1.2",
  "baseText": "abc",
  "TODO": "add properties here"
}
```

2. add a _fragment editor dumb component_ named after the fragment (e.g. `ng g component comment-fragment` for `CommentFragmentComponent` after `CommentFragment`), and extending `ModelEditorComponentBase<T>` where `T` is the fragment's type:
   1. in the _constructor_, instantiate its "root" form group (named `form`), filling it with the required controls.
   2. eventually add _thesaurus_ entries properties for binding, populating them by overriding `onThesauriSet` (`protected onThesauriSet() {}`).
   3. implement `OnInit` calling `this.initEditor();` in it.
   4. (from _model to form_): implement `onModelSet` (`protected onModelSet(model: YourModel)`) by calling an `updateForm(model: YourModel)` which either resets the form if the model is falsy, or sets the various form's controls values according to the received model, finally marking the form as pristine. Also, if you are keeping a property for the fragment's model, set it here.
   5. (from _form to model_): override `getModelFromForm(): YourModel` to get the model from form controls by calling the base class `getModelFromJson`. If this returns null, create a new fragment object with default values; then, fill its properties from the form's controls. This merges the inherited properties (from JSON code) with those edited.
   6. build your component's _template_.

Sample code:

```ts
import { Component, OnInit } from '@angular/core';
import { CommentFragment } from '../comment-fragment';
import { ModelEditorComponentBase, DialogService } from '@cadmus/ui';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ThesaurusEntry } from '@cadmus/core';

/**
 * Comment fragment editor component.
 * Thesauri: "comment-tags" when you want to use a closed set of tags.
 */
@Component({
  selector: 'cadmus-comment-fragment',
  templateUrl: './comment-fragment.component.html',
  styleUrls: ['./comment-fragment.component.css']
})
export class CommentFragmentComponent
  extends ModelEditorComponentBase<CommentFragment>
  implements OnInit {
  public fragment: CommentFragment;

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

  private updateForm(model: CommentFragment) {
    if (!model) {
      this.form.reset();
      return;
    }
    this.tag.setValue(model.tag);
    this.tags.setValue(model.tag);
    this.text.setValue(model.text);
    this.form.markAsPristine();
  }

  protected onModelSet(model: CommentFragment) {
    this.fragment = model;
    this.updateForm(model);
  }

  protected onThesauriSet() {
    const key = 'comment-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): CommentFragment {
    let fr = this.getModelFromJson();
    if (!fr) {
      fr = {
        location: this.fragment ? this.fragment.location : null,
        tag: null,
        text: null
      };
    }
    fr.tag = this.trimIfAny(this.tag.value);
    fr.text = this.text.value? this.text.value.trim() : null;
    return fr;
  }
}
```

Sample HTML template:

```html
<form [formGroup]="form" (submit)="save()">
  <mat-card>
    <mat-card-header>
      <div mat-card-avatar>
        <mat-icon>textsms</mat-icon>
      </div>
      <mat-card-title>__NAME__ Fragment {{ fragment?.location }}</mat-card-title>
      <mat-card-subtitle>
        {{ fragment?.baseText }}
      </mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      TODO: add controls
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

3. add a _fragment editor demo dumb component_ named after the part (e.g. `ng g component comment-fragment-demo` for `CommentFragmentDemoComponent` after `CommentFragment`). This will essentially be a wrapper of two distinct controls: the fragment's editor component, and a `JsonEditorResourcesComponent`. These components are mutually connected, so that you can edit the JSON code for the part (and eventually for its thesauri sets) and set the visual editor to it, or vice-versa. Remember to include this component both in the `declarations` and `exports` of its module.

Code template (replace `__NAME__` with your model name, adjusting case as required):

```ts
import { Component, OnInit, Input } from '@angular/core';
import { JsonSchemaService, ThesauriSet } from '@cadmus/core';
import { __NAME___FRAGMENT_TYPEID, __NAME___FRAGMENT_SCHEMA } from '../__NAME__-fragment';

@Component({
  selector: 'cadmus-__NAME__-fragment-demo',
  templateUrl: './__NAME__-fragment-demo.component.html',
  styleUrls: ['./__NAME__-fragment-demo.component.css']
})
export class __NAME__FragmentDemoComponent implements OnInit {
  private _thesauriJson: string;

  public currentTabIndex: number;
  public schemaName = __NAME___FRAGMENT_TYPEID;
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
    schemaService.addSchema(__NAME___FRAGMENT_TYPEID, __NAME___FRAGMENT_SCHEMA);
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
      <h2>__NAME__ Fragment Editor Demo</h2>
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
        <cadmus-__NAME__-fragment
          [(json)]="modelJson"
          [thesauri]="thesauri"
          (jsonChange)="onEditorSaved()"
          (editorClose)="onEditorSaved()"
        ></cadmus-__NAME__-fragment>
      </mat-tab>
    </mat-tab-group>
  </mat-card-content>
</mat-card>
```

## Adding Fragment Demo Feature to the App

1. add a demo page feature in the cadmus app, under its `demo` folder, creating a `feature-<fragmentname>-fragment-demo` (or `...-fragment-demo`) component (e.g. `ng g component feature-comment-fragment-demo -s -t`).

The code template is minimal (including also the HTML template and no CSS; replace `__NAME__` with your model name; you can use `ng g component ... -s -t` to inline the styles and HTML template, [more here](https://github.com/angular/angular-cli/wiki/generate-component)):

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'cadmus-feature-__NAME__-fragment-demo',
  template: `
    <cadmus-__NAME__-fragment-demo></cadmus-__NAME__-fragment-demo>
  `,
  styles: []
})
export class Feature__NAME__FragmentDemoComponent {}
```

2. in its module (`app.module.ts`), add the corresponding route:

```ts
{
  path: 'demo/__NAME__-fragment',
  component: Feature__NAME__FragmentDemoComponent,
  pathMatch: 'full'
},
```

3. in its `app.component.html`, add a new entry to the demo menu:

```html
<a mat-menu-item routerLink="/demo/__NAME__-fragment">__NAME__ fragment</a>
```

4. in `part-editor-keys.ts`, add the mapping between the fragment and its group ID, e.g.:

```ts
export const PART_EDITOR_KEYS: PartEditorKeys = {
  // ...
  [TOKEN_TEXT_LAYER_PART_TYPEID]: {
    part: GENERAL,
    fragments: {
      [COMMENT_FRAGMENT_TYPEID]: GENERAL,
      [APPARATUS_FRAGMENT_TYPEID]: PHILOLOGY,
      [ORTHOGRAPHY_FRAGMENT_TYPEID]: PHILOLOGY,
      [WITNESSES_FRAGMENT_TYPEID]: PHILOLOGY
    }
  }
};
```

## Adding Fragment Feature to the PartGroup-Feature Library

In a `<partgroup>-feature` module:

1. add a _fragment editor feature component_ named after the part (e.g. `ng g component comment-fragment-feature` for `CommentFragmentFeatureComponent` after `CommentFragment`), with routing. Ensure that this component is both under the module `declarations` and `exports`. Each editor has its component, and its state management artifacts under the same folder (store, query, and service). Add the corresponding route in the module, e.g.:

```ts
{
  path: `fragment/:pid/${__NAME___FRAGMENT_TYPEID}/:loc`,
  pathMatch: 'full',
  component: __NAME__FragmentFeatureComponent,
  canDeactivate: [PendingChangesGuard]
}
```

2. inside this new component's folder, add a new _store_ for your model, named `edit-<fragmentname>-fragment.store.ts`. Template:

```ts
import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import {
  EditFragmentState,
  EditFragmentStoreApi,
  editFragmentInitialState
} from '@cadmus/features/edit-state';
import { __NAME___FRAGMENT_TYPEID } from '@cadmus/parts/__PARTGROUP__/__PARTGROUP__-ui';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: __NAME___FRAGMENT_TYPEID })
export class Edit__NAME__FragmentStore extends Store<EditFragmentState>
  implements EditFragmentStoreApi {
  constructor() {
    super(editFragmentInitialState);
  }

  public setDirty(value: boolean): void {
    this.update({ dirty: value });
  }
  public setSaving(value: boolean): void {
    this.update({ saving: value });
  }
}
```

3. in the same folder, add a new _query_ for your model, named `edit-<fragmentname>-fragment.query.ts`. Template:

```ts
import { Injectable } from '@angular/core';
import { EditFragmentQueryBase } from '@cadmus/features/edit-state';
import { Edit__NAME__FragmentStore } from './edit-__NAME__-fragment.store';

@Injectable({ providedIn: 'root' })
export class Edit__NAME__FragmentQuery extends EditFragmentQueryBase {
  constructor(
    protected store: Edit__NAME__FragmentStore
  ) {
    super(store);
  }
}
```

4. in the same folder, add a new _service_ for your model, named `edit-<fragmentname>-fragment.service.ts`. Template:

```ts
import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { EditFragmentServiceBase } from '@cadmus/features/edit-state';
import { Edit__NAME__FragmentStore } from './edit-__NAME__-fragment.store';

@Injectable({ providedIn: 'root' })
export class Edit__NAME__FragmentService extends EditFragmentServiceBase {
  constructor(
    editPartStore: Edit__NAME__FragmentStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
```

5. implement the feature editor component by making it extend `EditFragmentFeatureBase`, like in this code template:

```ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Edit__NAME__FragmentQuery } from './edit-__NAME__-fragment.query';
import { Edit__NAME__FragmentService } from './edit-__NAME__-fragment.service';
import {
  EditItemQuery,
  EditItemService,
  EditLayerPartQuery,
  EditLayerPartService,
  EditFragmentFeatureBase
} from '@cadmus/features/edit-state';

@Component({
  selector: 'cadmus-__NAME__-fragment-feature',
  templateUrl: './__NAME__-fragment-feature.component.html',
  styleUrls: ['./__NAME__-fragment-feature.component.css']
})
export class __NAME__FragmentFeatureComponent extends EditFragmentFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    editFrQuery: Edit__NAME__FragmentQuery,
    editFrService: Edit__NAME__FragmentService,
    editItemQuery: EditItemQuery,
    editItemService: EditItemService,
    editLayersQuery: EditLayerPartQuery,
    editLayersService: EditLayerPartService,
    libraryRouteService: LibraryRouteService
  ) {
    super(
      router,
      route,
      editFrQuery,
      editFrService,
      editItemQuery,
      editItemService,
      editLayersQuery,
      editLayersService,
      libraryRouteService
    );
  }

  ngOnInit() {
    // TODO: add the required thesauri IDs in the initEditor call,
    // like 'comment-tags' in this sample
    this.initEditor(['comment-tags']);
  }
}
```

Define the corresponding HTML template like:

```html
<cadmus-current-item-bar></cadmus-current-item-bar>
<div class="base-text">
  <cadmus-decorated-token-text
    [baseText]="baseText$ | async"
    [locations]="[frLoc]"
  ></cadmus-decorated-token-text>
</div>
<cadmus-__NAME__-fragment
  [json]="json$ | async"
  (jsonChange)="save($event)"
  [thesauri]="thesauri$ | async"
  (editorClose)="close()"
  (dirtyChange)="onDirtyChange($event)"
></cadmus-__NAME__-fragment>
```
