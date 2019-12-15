# Adding Fragments

## Adding a Parts/Fragments Libraries

Same as parts.

## Adding Part to the UI Library

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
  $id: 'http://example.com/root.json',
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
   1. in the _constructor_ (injecting a `FormBuilder` and a `DialogService`; the latter to be passed to the `super` constructor: `formBuilder: FormBuilder, dialogService: DialogService`), instantiate its "root" form group (named `form`), filling it with the required controls.
   2. eventually add _thesaurus_ entries properties for binding, populating them by overriding `onThesauriSet` (`protected onThesauriSet() {}`).
   3. (from _model to form_): override `onModelSet` (`protected onModelSet(model: YourModel)`) by calling an `updateForm(model: YourModel)` which either resets the form if the model is falsy, or sets the various form's controls values according to the received model, finally marking the form as pristine. Also, if you are keeping a property for the fragment's model, set it here.
   4. (from _form to model_): override `getModelFromForm(): YourModel` to get the model from form controls by calling the base class `getModelFromJson`. If this returns null, return a new fragment object with default values; else, fill its properties from the form's controls. This merges the inherited properties with those edited.
   5. build your component's _template_.

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

  constructor(formBuilder: FormBuilder, dialogService: DialogService) {
    super(dialogService);
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

  ngOnInit() {}

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
    fr.tag = this.tag.value? this.tag.value.trim() : null;
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
        (closeRequest)="close()"
      ></cadmus-close-save-buttons>
    </mat-card-actions>
  </mat-card>
</form>
```
