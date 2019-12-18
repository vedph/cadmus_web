# Architecture

The general multirepo architecture is structured into these sections:

- `apps/cadmus`: the frontend app.
- `libs/core`: core services and models.
- `libs/features`: app's features libraries:
  - `libs/feature-admin`: admin section pages.
  - `libs/feature-...`: a feature library for each page.
  - `libs/features-ui`: components shared among features.
- `libs/material`: Angular material.
- `libs/parts`: Cadmus parts libraries:
  - `<partgroup>/<partgroup>-ui`: core services and models plus dumb UI components for parts and fragments in a specific group. E.g. `libs/parts/general/general-ui`.
  - `<partgroup>/<partgroup>-feature`: feature pages for parts and fragments in a specific group. E.g. `libs/parts/general/general-feature`.
- `libs/ui`: shared dumb UI components.

TODO: complete the graph below

```plantuml
@startuml
core <|-- api
core <|-- "general-ui"
core <|-- "general-feature"
core <|-- "philology-ui"
core <|-- "feature-admin"
core <|-- "features-ui"
core <|-- "feature-layer-demo"
core <|-- "feature-item-list"
core <|-- "feature-token-layer-part-editor"
api <|-- "feature-item-list"
core <|-- api
core <|-- cadmus
material <|-- "general-ui"
material <|-- "philology-ui"
material <|-- "feature-admin"
material <|-- "features-ui"
material <|-- "feature-layer-demo"
material <|-- "feature-item-list"
material <|-- "feature-token-layer-part-editor"
material <|-- cadmus
core <|-- "edit-state"
"edit-state" <|-- "general-feature"
"edit-state" <|-- "features-ui"
ui <|-- "general-ui"
ui <|-- "general-feature"
ui <|-- "philology-ui"
ui <|-- "feature-admin"
ui <|-- "feature-layer-demo"
ui <|-- "feature-item-list"
ui <|-- "feature-login"
ui <|-- "feature-token-layer-part-editor"
"general-ui" <|-- cadmus
"general-ui" <|-- "general-feature"
"general-feature" <|-- cadmus
"philology-ui" <|-- cadmus
"feature-admin" <|-- cadmus
"feature-layer-demo" <|-- cadmus
"feature-item-list" <|-- cadmus
"feature-item-editor" <|-- cadmus
"feature-token-layer-part-editor" <|-- cadmus
"feature-login" <|-- cadmus
cadmus <|-- "cadmus-e2e"
@enduml
```
