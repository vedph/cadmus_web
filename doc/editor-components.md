# Editor Components

## User Experience

The user experience usually starts from a **list of items**, which is paged and filtered.

When the user picks an item from the items list, he navigates to the **item editor**, which shows a list of all its parts, grouped, sorted, and colored according to the profile being used.

In the item editor, if the user clicks on any part, he navigates to the **part editor** for that part type. Each part editor has its own UI, just as each part has its own model.

When closing the part editor, the user navigates back to the item editor. A "pending changes" warning will appear if he has edited the part's data without saving them, or if he has attempted to save but there was an error (e.g. a network error).

The *layer part editor* is just a part editor like any other, and this is true also for its route. Anyway, its type is the same for any type of layer. Just like items types just result from the sum of their parts, layer types result from the fragments they contain. For instance, a comments layer is just a layer including comment fragments.

Thus, the layer part editor can be the same for any layer: it just presents the base text, where each portion linked to a fragment is highlighted. The user can either select a new text portion to link it to a new fragment; or select any part of the highlighted text to edit the corresponding fragment.

In either case, when editing a fragment the user navigates to the **fragment editor** for that fragment type. From there he can go back to the part layer, with the same "pending changes" warning described above.

Also, in the development app we also provide (for diagnostic and demonstrative purposes) a set of **demo pages**, each for any part or fragment editor. These are found under the `Demo` menu.

Thus, each part/fragment type has:

- its own **editor control**. This is a "dumb" component, which communicates with the rest of the system only by means of input and output properties. These follow a well-defined API, so that all the dumb components are equal in this respect. The dumb editor control thus knows nothing about the server providing its data, or the route leading to it. It is just a "blind" editor, totally unaware of its context. Data get pushed to it via bindings, and are output from it via events.
- its own **editor control feature**. This is a "smart" component, which connects the dumb editor components with the outer world, and is connected to a specific route in the application.
- its own **route** in the web app. All the editor routes are built so that you can directly jump to any specific item, part, or fragment, by just entering its URL.
- (optionally) its own **demo control**, which is just a wrapper for the dumb editor component, with demo and diagnostic purposes only, and a generic JSON code editor. Thus, the user can edit JSON code and see how it gets mapped to the visual editor; or visually edit a model, and see how it gets serialized into JSON code. In turn, here the JSON code editor is another dumb component, to be included in any demo control.

### Layers Editors Types

As remarked above, in general a text layers part is no different from any other part: it has the same route structure, which brings to an editor page. The only operative difference is that this page is used to select layers and fragments inside them, and in turn to edit fragments into another page.

The layers part editor is thus the same whatever the layers we are going to support: it is just the fragment type which changes.

Yet, there is another factor in text layers, other than the layer type: it is the text itself, i.e. the *type of the base text*. For instance, currently there are 2 types of text parts: token-based and tiles-based.

In **token-based text part** (here *T-text* for short), which is the usual choice, users type a freely editable, multiline plain text.

Here, the coordinates system used to link layers essentially relies on line and token number. The *token* here is defined as any sequence of characters separated by space (i.e. as a "graphical" word). Additionally, coordinates can refer also to a portion of a token, by specifying character number and count. This makes it possible to refer layers up to a single character in the base text. In practice, whatever text you can select can be linked to a layer, from a single character up to any number of words, even spanning multiple lines.

In the layers part editor referring to a token-based text, users have the base text displayed, and they just select any portion of it. The coordinates corresponding to the selection are automatically calculated, whatever the extent of the selection.

The **tiles-based text part** (here *L-text* for short) is a special-purpose model, where the text is laid on a bidimensional plane made of rows, and each row contains 1 or more tiles. You can think of it as a floor paved with rows of differently-sized tiles. Each tile contains an atomic portion of the text, arbitrarily defined. For instance it could just be a word, or a syllable in a syllabic writing system; whatever it is, it represents the atom as far as layers are concerned.

The coordinates system is similar to the token-based text, but limited to this atom (the tile): it has a row number (like line number in the T-text) and a tile number (like token number in the T-text).

In the layers part editor referring to a tiles-based text, users have the base text displayed as tiles (rectangles including text) in rows. Each tile can be checked with a tick to select it. Coordinates just refer to the checked tiles, which are always contiguous.

This type of text editing is thus more constrained, as far as tiles are atoms: users can add new tiles, delete or move existing tiles, or change their text; but each tile is allowed to keep its identity together with any number of other metadata, which survive all these editing operations. Further, metadata can also be attached to each row, which can be similarly edited.

Even if it is generic enough to find other usages (non-alphabetic writing systems can be an example), this system was first born to provide Cadmus with a way to *keep legacy metadata while editing them*. This is a requirement in scenarios where the primary purpose is not creating a database, but rather edit a set of resources provided by a third-party legacy system, and then lend them back to this system. In this case, Cadmus must deal with a big number of metadata connected to arbitrary portions of text, which are useless in the context of its own boundaries, but required to ensure compatibility with the target legacy system.

For instance, this happens when dealing with legacy TEI documents with standoff apparatus, like those provided by an export of MQDQ data. In this case, we have a set of poetic texts, each divided into lines; some of these lines just contain the text, while others, being connected to an apparatus, contain a number of children elements, each representing a word. Each line and word element have their own attributes (first of all the `xml:id` attribute identifying each to allow linking to the apparatus), which must be kept unchanged during editing, to be later re-exported into TEI documents.

In this scenario, the tiles-based text is used so that rows are lines and tiles are words; all the attributes of each element become metadata, attached to rows and tiles. Users are free to edit the base text or the apparatus linked to it; yet, whatever their actions legacy metadata are preserved inside each row and tile. These metadata can be edited too (in the tiled-text editor UI), but this rarely happens: in practice it is limited to fix errors in the source.

Thus, as there are 2 types of base texts, there are also 2 types of layer parts, one for each base text type. Each of these layer parts has its own editor and route, just like any other part editor.

### Finding the Base Text for a Layer

It should be noticed that whatever the layer part type, some common functionalities are shared among them.

For instance, whenever editing a fragment, as a reference to the user we must show the base text it refers to. Whatever its model, here we just require a string representing it.

This is the purpose of the `baseText` property of the layer part editor's state (`EditLayerPartState`), which is filled by requesting the API server the base text for the part's item (at the endpoint `api/{database}/item/{itemId}/base-text`).

Thus, in turn the backend must be able to know which is the the part representing the base text for any specified item. This is accomplished thanks to the `base-text` reserved role ID, specified in the facet definitions. For any facet related to an item having layered text, the definition of its part representing the base text must have this role ID.

For instance, here is the definition of the base text part in a Cadmus profile:

```json
{
  "typeId": "net.fusisoft.token-text",
  "roleId": "base-text",
  "name": "text",
  "description": "Item's token-based text.",
  "colorKey": "31AB54",
  "groupKey": "text",
  "sortKey": "text",
  "editorKey": "general"
}
```

Finally, we should notice that, deeper in the backend layer, all the parts representing base text implement the `IHasText` interface, which defines a `GetText()` method returning a string. Whatever the model of the part, it is up to it to implement this method, so that it can return a single string representing its text.

Another potential usage for this method is full-text indexing: for instance, the generic note part implements this interface as well, right for this purpose. Anyway, the above API endpoint is the reason why every base-text part must ensure to implement this interface.

**Implementation note**: the base text as a (multiline) string is all what is required for a token-based layer part editor, because in this text model the text is automatically partitioned on the basis of lines and tokens. For instance, when we consider the first line of such a text, we can tell that its Y coordinate is 1 (just because it's the first line), and that the X coordinate of its second token is 2 (just because it's the sequence of characters after the first space in that line). This is not the case for other text models: in fact, the tiles-based text reflects an *arbitrary* division of text into its tiles: they could be words, syllables, groups of words, etc. Thus, there is no way of reconstructing this division from the raw base text. This is why the tiles-based part editor needs to retrieve the base text part model, besides the part layer part it represents. Anyway this is just an implementation detail, the general architecture staying the same. The fact that the layer part based on T-text is a different type from the layer part based on L-text ensures that each can have its specific implementation when required.

## Architecture

As editing components are modular, they are located in separate libraries. Each library contains a set of related part/fragment editors; for instance, the "general" part contains generic-purpose models like e.g. categories, keywords, or comments; the "philology" part contains critical apparatus or orthography layers; etc. In other terms, each library refers to a group of models (parts or fragments models).

As we have two types of editors, dumb and smart (feature), for each group we also have two types of libraries (with a different set of dependencies): one for the dumb editors, and another for the feature editors.

Thus, for each group of models we have 2 libraries; and for each model editor we have 3 components:

- a *dumb UI component* which is the editor proper. This deals with raw JSON code both at its input and output, whatever its model.
- a *feature UI component* which wraps the dumb editor, using it in the context of its route and edit state.
- an optional *demo dumb component*, which wraps the dumb editor coupled with a JSON editor, mainly used for demonstrative or diagnostic purposes.

The dumb components on one side, and the feature components on the other side, are located in two different libraries (feature components have routing and depend on states and services, whereas dumb components have much simpler dependencies).

The architecture of part/fragments editing, from bottom to top, is as follows:

1. `<X>PartComponent` or `<X>FragmentComponent` (in a `<partgroup>-ui` module): at the bottom level, we have a dumb UI component for part/fragment X, extending `ModelEditorComponentBase<T>`. Each dumb editor just ingests JSON documents representing the model and eventually its thesauri, and spits out JSON code representing the edited model. Usually, you derive your editors from base classes, which provide basic functionality and a useful template to start from.

2. `<X>PartDemoComponent` or `<X>FragmentDemoComponent` (in the same `<partgroup>-ui` module): a container for a JSON code editor and the editor dumb component at (1), used for demo purposes. These are just wrapper components, including these two dumb components.

3. `<X>PartFeatureComponent` (in a `<partgroup>-feature` module): the dumb UI component for part X is wrapped into a feature UI component. These components wrap their dumb counterparts, and provide Akita-based state management and route handling.

## 1. Dumb Editor

The open-ended portion of the UI is represented by part and fragment editors. At the bottom level, both are dumb UI components extending `ModelEditorComponentBase<T>`, where `T` is the model's type (=the type of the part or fragment).

A dumb component gets as input the JSON representing the model, and optionally the JSON representing a set of thesauri. It outputs the JSON representing the model (when saved), a request to close the editor, and a notification about the dirty state of the editor itself.

The base class provides this API:

**Input**:

- `disabled` (type `boolean`): whether the editor is disabled. When changed, the "root" form of the editor is disabled or enabled accordingly.
- `json` (type `string`): the JSON code representing the model being edited. The corresponding output is implemented via the `jsonChange` event.
- `thesauri` (type `ThesauriSet | null`): optional thesauri sets to be consumed by the editor. Each thesaurus is keyed under its own ID.

**Output**:

- `jsonChange` (type `string`): emitted when the user saves the form with valid data.
- `editorClose` (no argument): emitted when the user requests the editor to close.
- `dirtyChange` (type `boolean`): emitted when the dirty state of the editor form changes.

**Helpers**:

- `form: FormGroup`: the "root" form of the editor. You *must instantiate* this in your derived editor constructor.
- `initEditor`: initialize the editor; you *must call* this in your `OnInit`.
- `onModelSet`: invoked whenever the json property is set, unless setting it via `updateJson`. Implement to update the form to reflect the new part value.
- `onThesauriSet`: invoked whenever the thesauri property is set.
- `getModelFromJson(json: string = null): T`: get the model from the specified JSON code, or from the current json property if no JSON code is specified. This is just a helper method for parsing JSON code (when truthy), and casting it to the template argument type.
- `getModelFromForm(): T`: implement in derived classes to get the model from form's controls. This is used when saving (=data goes to the output `jsonChange` event).
- `updateJson(json: string)`: update the `json` property from the specified code, without triggering a call to `onModelSet`.
- `trimIfAny`: a utility function for trimming a string, and optionally flatten and normalize its whitespaces. This is often the case when saving user input into a model.
- `close()`: emit the close editor request event. Note that an eventual dirty prompt is deferred to the guard.
- `save()`: if the root form is valid, get the model from its controls, serialize it into JSON and emit the JSON change event, marking the root form as pristine.

Also, the base class implements `ComponentCanDeactivate`, which is used by pending changes guards to decide if the user should be prompted when leaving the editor. This relies on the `dirty$` input property, and on the root form's dirty state: both must be false for the guard to allow exiting the editor without prompting.

A typical editor extending this base can follow these guidelines:

- instantiate the root `form` adding to it your *form controls*.
- eventually add *thesaurus properties* to be consumed by the template. When thesaurus properties are required, set them by overriding `onThesauriSet`.
- call `initEditor()` in `ngOnInit`.
- to *update the form controls* from the part's model (or null), add an `updateForm(model)` method, calling it from your `onModelSet` implementation.
- to *get a model object from the form controls* (while inheriting in it properties set from the outer context, like IDs from the route), implement the `getModelFromForm` method. Among the common part's properties, only `typeId` gets set at this level; the other properties will be set by the feature component wrapping the editor.
- *template*: a form bound to `form`, including a `mat-card`. Header and footer in the card should be standardized, while the content is free.

## 2. Editor Demo

Each part editor usually is provided with a corresponding demo component, which allows users to play with the editor by passing JSON data to it, or getting JSON data from it.

The demo component is built of two distinct controls:

- a general purpose `JsonEditorResourcesComponent`: JSON editors for model and eventually thesauri sets. This represents the *code* editor.
- a specific part editor component. This represents the *visual* editor.

In the code editor, you should enter the model's JSON code, and eventually one or more thesauri.

The model's code must be valid according to its schema (the JSON schema specified in the models). You can find instances of JSON presets for models and thesauri [here](demo-presets.md).

## 3. Feature Editor

The feature editor is a wrapper around the dumb editor. It has an Angular route, and depends on two *Akita* components:

- an X-part/fragment *query*, used to read data from the store;
- an X-part/fragment *service*, used to write data to the store, and to load its state when the component is initialized. In Akita, components should never interact with stores directly; such services act as facades, and couple the store with an API service).

Usually, the service extends `EditPartServiceBase` (for parts) or `EditFragmentServiceBase`, which provide load/save methods and a dirty state setter. The component binds a number of observable properties to the query, and its template is fed from these observables. When the store gets updated (via the service), the observables change, and this is reflected in the reactive UI.

When the user saves in an editor dumb component, the `jsonChange` event is emitted, and the form is set to pristine state.

In turn, the editor feature component handles the `jsonChange` event by invoking its service's `save` method with the JSON code representing the part to be saved.

The `save` method (implemented in the base service) sets the "saving" and "dirty" states to true, and invokes the API save method:

- if the API succeeds, the "saving" and "dirty" states are set to "false".
- if the API fails, the "saving" state is set to false (while "dirty" remains true).
