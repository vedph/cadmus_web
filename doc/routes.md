# Routes

The editing-related routes are:

- `/items`: list of items.

- `/items/<id>`: single item editor. This allows editing the item's metadata, and shows a list of its parts, where you can add or remove parts. Item's `id` is equal to `new` for a new item.

- `/items/<id>/<part-group>/<part-typeid>/<part-id>?rid=<role-id>`: single part editor. Role ID is optional.

- `/items/<id>/<part-group>/fragment/<part-id>/<fr-typeid>/<loc>?rid=<role-id>`: single part's fragment editor. Role ID is optional.

Note that the part-editing routes always have a `part-group` key. This comes from the `editorKey` property of each part's definition; if such a property is not defined (but in practice this should never happen), it defaults to `default`.

For layer parts, the `editorKey` can be a composite value, with 2 different values separated by space. In this case, the first value is the *part* editor key, and the second value is the *fragment* editor key. Should these be equal, you can just use a single, non composite value for both.

For instance, consider this part definition in a data profile:

```json
{
  "typeId": "net.fusisoft.token-text-layer",
  "roleId": "fr.net.fusisoft.apparatus",
  "name": "apparatus",
  "description": "Critical apparatus.",
  "colorKey": "D4E0A4",
  "groupKey": "text",
  "sortKey": "text-apparatus",
  "editorKey": "general philology"
},
```

Here, the editor key is composite, because the text layer part editor is in the `general` library, while the apparatus fragment editor is in the `philology` module.

Grouping parts is a requirement because we want to be able to *lazily* load our part-related modules. For instance, all our generic parts are under the same `generic` group key, and their code is found in the corresponding, lazy-loaded module. When editing an item's part, the frontend looks at the part definitions, searching for the first one matching the part's type ID; then, it uses the corresponding part's group key to build the edit URL.

Routes to part/fragment editors are built by a specialized service, `LibraryRouteService`. The routes to feature editors are defined in the respective lazily-loaded modules.

Routes **examples**:

1. a **part** route without role:

- `/items/`
- `41d5208b-1af7-44a1-b690-33f85c7d24fa/`: item's ID.
- `general/`: group key.
- `net.fusisoft.note/`: part's type ID.
- `eafc9d63-f790-4c96-8107-294f4cb1a952`: part's ID.

Here the group key follows the route to the lazily loaded module with the part editor (`general`), while the part's type ID (`net.fusisoft.net`) tells which editor should be used from that module.

2. a **part** route with **role**: this is the same as #1, except for the final `rid` query parameter.

- `/items/`
- `41d5208b-1af7-44a1-b690-33f85c7d24fa/`: item's ID.
- `general/`: group key.
- `net.fusisoft.note/`: part's type ID.
- `eafc9d63-f790-4c96-8107-294f4cb1a952`: part's ID.
- `?rid=scholarly`: part's role ID. This distinguishes a scholarly note, as opposed to a general purpose note (this sample is limited to the note part for clarity; but in the case of a note you would not require a role, as the note part has a `tag` property right for the purpose of grouping notes into different sets).

Here the role ID is ignored as for determining the target page, as the part's editor is always the same, whatever its role. Yet, the role information must be retained in order to properly save the part.

3. a **text layer fragment** route:

- `/items/`
- `41d5208b-1af7-44a1-b690-33f85c7d24fa/`: item's ID.
- `general/`: group key.
- `fragment/`
- `eafc9d63-f790-4c96-8107-294f4cb1a952/`: part's ID.
- `fr.net.fusisoft.comment`: fragment's type ID. This is equal to the part's role ID, stripping an eventual layer's role ID out.
- `2.1`: the fragment's location.

4. a **text layer fragment** route with layer **role**:

- `/items/`
- `41d5208b-1af7-44a1-b690-33f85c7d24fa/`: item's ID.
- `general/`: group key.
- `fragment/`
- `eafc9d63-f790-4c96-8107-294f4cb1a952/`: part's ID.
- `fr.net.fusisoft.comment`: fragment's type ID. This is equal to the part's role ID, stripping an eventual layer's role ID out.
- `2.1`: the fragment's location.
- `?rid=scholarly`: the layer's role. This is the optional suffix appended to the text layer part's role after a colon. For instance, the part's role might be `fr.net.fusisoft.comment:scholarly`; in this case, the fragment type ID is `fr.net.fusisoft.comment`, and the layer role ID is `scholarly`.
