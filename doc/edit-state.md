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

- item
- partGroups (for non-layer parts)
- layerPartInfos
- facet: the item's facet definition.
- facets: all the available facets definitions.
- flags: all the available flags definitions.
- typeThesaurus: thesaurus for model types.
- dirty
- saving
- deletingPart
- loading
- error

## Edit Part

- part
- thesauri
- dirty
- saving
- loading
- error

## Edit Layer Part

- part
- baseText
- baseTextPart
- loading
- error
- deletingFragment
- savingFragment
