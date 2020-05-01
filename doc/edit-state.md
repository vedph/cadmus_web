# Edit State

The local edit state is kept in the web app using Akita.

The hierarchical edit model is as follows:

1. **items list**:

   - delete item.
   - add/edit item: move to (2) item editor.

2. **item editor** (state: `edit-item`):

   - metadata: edit and save.
   - parts: add/edit part: move to (3) part editor. For new items, no parts can be added or edited before the item is first saved.
   - layers:
     - delete layer part.
     - add layer part.
     - edit layer part: move to (3B) layer part editor.

3. part editors:

- **non-layer part editor** (state: `edit-part`):
  - save part.
  - close and return to (2) item editor.

- **layer part editor** (state: `edit-layer-part`):
  - delete fragment.
  - add/edit fragment: move to (4) fragment editor.

4. **fragments**:

   - save fragment.
   - close and return to (3B) layer part editor.

## Edit Item

- `item`
- `parts`: the raw list of item's parts.
- `partGroups`: the non-layer parts, grouped.
- `layerPartInfos`: layer parts (either existing and not existing).
- `facet`: the item's facet definition.
- `facets`: all the available facets definitions.
- `flags`: all the available flags definitions.
- `typeThesaurus`: thesaurus for model types.
- `dirty`
- `saving`
- `deletingPart`
- `loading`
- `error`

## Edit Part

- `part`
- `thesauri`
- `dirty`
- `saving`
- `loading`
- `error`

## Edit Layer Part

- `part`
- `baseText`
- `baseTextPart`
- `breakChance`: the estimated chance of broken fragments in this layer: 0=safe, 1=potentially broken, 2=broken.
- `layerHints`: the layer fragments reconciliation hints. There is one hint for each fragment in the layer.
- `loading`
- `error`
- `deletingFragment`
- `savingFragment`
- `refreshingBreakChance`
- `patchingLayer`

## Edit Thesaurus

- `thesaurus`
- `dirty`
- `saving`
- `loading`
- `error`

## App State

There is also an app-level state consisting of readonly data, which are loaded once when the app starts. These contain lookup data of general use, which can safely be assumed never to change during a single editing session, as they depend on the backend profile.

These data are:

- `facets`: the list of all the facets definitions.
- `flags`: the list of all the flags definitions.
- `typeThesaurus`: the optional thesaurus for model-types. This (if present) is used to display human-friendly part types names from their IDs. Otherwise, the raw IDs are displayed.
- `itemBrowserThesaurus`: the optional thesaurus for items browsers. This (if present) is used to display the items browsers menu, using each thesaurus entry ID as part of the target route, and its value as the menu's label.
