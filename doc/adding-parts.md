# Adding Parts

To **add a new parts library**:

- create a new Nrwl Angular library named `<partgroup>-ui` under `parts/<partgroup>` (use simple module name in generator). For instance, for general purpose parts I created `parts/general/general-ui`. This will host dumb components for editing and their demo counterparts.
- create a new Nrwl Angular library named `<partgroup>-feature` under `parts/<partgroup>` (use simple module name in generator). For instance, for general purpose parts I created `parts/general/general-feature`. This will host the pages (features) for each part. Every page wraps the dumb UI component into a component which has a corresponding Akita's state, and gets its data pushed via observables. Also, each page has a route (see above).

To **add a new part**:

a) in a `<partgroup>-ui` module:

1. add the part _model_ (derived from `Part`), its type ID constant, and its JSON schema constant to `<part>.ts` (e.g. `note-part.ts`). You can use a template like this (replace `__NAME__` with your part's name, e.g. `Note`, adjusting case where required):

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
export const __NAME___PART_TYPEID = 'net.fusisoft.__NAME__';

/**
 * JSON schema for the __NAME__ part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const __NAME___PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.fusisoft.net/cadmus/parts/general/__NAME__.json',
  type: 'object',
  title: '__NAME__Part',
  required: ['id', 'itemId', 'timeModified', 'typeId', 'userId'],
  properties: {
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
      type: 'string'
      // pattern: '^([a-z][-0-9a-z._]*)?$'
    }

    // TODO: add properties and fill the "required" array as needed
  }
};
```

If you want to infer a schema in the [JSON schema tool](https://jsonschema.net/), which is usually the quickest way of writing the schema, you can use this JSON template adding your model's properties to it:

```json
{
  "id": "009dcbd9-b1f1-4dc2-845d-1d9c88c83269",
  "itemId": "2c2eadb7-1972-4415-9a43-b8036b6fa685",
  "typeId": "net.fusisoft.thetype",
  "roleId": null,
  "timeModified": "2019-12-10T20:31:31.7000245Z",
  "userId": "even",
  "TODO": "add properties here"
}
```

2. add a _part editor dumb component_ named after the part (e.g. `NotePartComponent` after `NotePart`), and extending `ModelEditorComponentBase<T>` where `T` is the part's type:
   1. in the *constructor* (injecting a `FormBuilder` and a `DialogService`; the latter to be passed to the `super` constructor), instantiate its "root" form group (named `form`), filling it with the required controls.
   2. eventually add *thesaurus* entries properties for binding, populating them by overriding `onThesauriSet`.
   3. (from *model to form*): override `onModelSet` by calling an `updateForm(model: YourPartModel)` which either resets the form if the model is falsy, or sets the various form's controls values according to the received model, finally marking the form as pristine.
   4. (from *form to model*): override `getModelFromForm(): YourPartModel` to get the model from form controls by calling the base class `getModelFromJson`. If this returns null, return a new part object with default values.
   5. build your component's *template*. A template skeleton is like:

```html
<form [formGroup]="form" (submit)="save()">
  <mat-card>
    <mat-card-header>
      <div mat-card-avatar>
        <mat-icon>picture_in_picture</mat-icon>
      </div>
      <mat-card-title>__NAME__ Part</mat-card-title>
    </mat-card-header>
  </mat-card>
  <mat-card-content>
    TODO: your template here...
  </mat-card-content>
  <mat-card-actions>
    <cadmus-close-save-buttons
      [form]="form"
      (closeRequest)="close()"
    ></cadmus-close-save-buttons>
  </mat-card-actions>
  </mat-card>
</form>
```

Remember to add the component to its module's `declarations` and `exports`.

3. add a _part editor demo dumb component_ named after the part (e.g. `NotePartComponentDemo` after `NotePart`). This will essentially be a wrapper of two distinct controls: the part's editor component, and a `JsonEditorResourcesComponent`. These components are mutually connected, so that you can edit the JSON code for the part (and eventually for its thesauri sets) and set the visual editor to it, or vice-versa.

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

  ngOnInit() {
  }

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

4. add a demo page feature in the cadmus app, under its `demo` folder, creating a `feature-<partname>-part-demo` (or `...-fragment-demo`) component.

The code template is minimal (including also the HTML template and no CSS; replace `__NAME__` with your model name; you can use `ng g component ... -s -t` to inline the styles and HTML template, [more here](https://github.com/angular/angular-cli/wiki/generate-component)):

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'cadmus-feature-__NAME__-part-demo',
  template: `<cadmus-__NAME__-part-demo></cadmus-__NAME__-part-demo>`,
  styles: []
})
export class Feature__NAME__PartDemoComponent { }
```

5. in its module (`app.module.ts`), add the corresponding route:

```json
{
  path: 'demo/__NAME__-part',
  component: Feature__NAME__PartDemoComponent,
  pathMatch: 'full'
},
```

6. in its `app.component.html`, add a new entry to the demo menu:

```html
<a mat-menu-item routerLink="/demo/__NAME__-part">__NAME__ part</a>
```

b) in a `<partgroup>-feature` module:

7. add a _part editor feature component_ named after the part (e.g. `NotePartFeatureComponent` after `NotePart`), with routing. Each editor has its component, and its state management artifacts under the same folder (store, query, and service).
