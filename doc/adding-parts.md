# Adding Parts

To **add a new parts library**:

- create a new Nrwl Angular library named `<partgroup>-ui` under `parts/<partgroup>` (use simple module name in generator). For instance, for general purpose parts I created `parts/general/general-ui`. This will host dumb components for editing and their demo counterparts.
- create a new Nrwl Angular library named `<partgroup>-feature` under `parts/<partgroup>` (use simple module name in generator). For instance, for general purpose parts I created `parts/general/general-feature`. This will host the pages (features) for each part. Every page wraps the dumb UI component into a component which has a corresponding Akita's state, and gets its data pushed via observables. Also, each page has a route (see above).

To **add a new part**:

a) in a `<partgroup>-ui` module:

1. add the part *model* (derived from `Part`), its type ID constant, and its JSON schema constant to `<part>.ts` (e.g. `note-part.ts`). For instance:

```ts
import { Part } from '@cadmus/core';

/**
 * Note part.
 */
export interface NotePart extends Part {
  text: string;
  tag: string;
}

/**
 * The type ID used to identify the NotePart type.
 */
export const NOTE_PART_TYPEID = 'net.fusisoft.note';

/**
 * JSON schema for the note part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const NOTE_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.fusisoft.net/cadmus/parts/general/note.json',
  type: 'object',
  title: 'NotePart',
  required: ['id', 'itemId', 'text', 'timeModified', 'typeId', 'userId'],
  properties: {
    // ... etc ...
  }
};
```

2. add a *part editor dumb component* named after the part (e.g. `NotePartComponent` after `NotePart`), and extending `ModelEditorComponentBase<T>` where `T` is the part's type.

3. add a *part editor demo dumb component* named after the part (e.g. `NotePartComponentDemo` after `NotePart`). This will essentially be a wrapper of two distinct controls: the part's editor component, and a `JsonEditorResourcesComponent`. These components are mutually connected, so that you can edit the JSON code for the part (and eventually for its thesauri sets) and set the visual editor to it, or vice-versa.

b) in a `<partgroup>-feature` module:

4. add a *part editor feature component* named after the part (e.g. `NotePartFeatureComponent` after `NotePart`), with routing. Each editor has its component, and its state management artifacts under the same folder (store, query, and service).
