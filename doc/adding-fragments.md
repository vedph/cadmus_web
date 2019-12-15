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
   3. (from _model to form_): override `onModelSet` (`protected onModelSet(model: YourModel)`) by calling an `updateForm(model: YourModel)` which either resets the form if the model is falsy, or sets the various form's controls values according to the received model, finally marking the form as pristine.
   4. (from _form to model_): override `getModelFromForm(): YourModel` to get the model from form controls by calling the base class `getModelFromJson`. If this returns null, return a new part object with default values; else, fill its properties from the form's controls. This merges the inherited properties with those edited.
   5. build your component's _template_. A template skeleton is like:
