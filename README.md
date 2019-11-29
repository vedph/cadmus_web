# Cadmus

This project was generated using [Nx](https://nx.dev).

1. `npx create-nx-workspace@latest cadmus`.
2. `nx migrate @nrwl/workspace` to eventually upgrade nrwl.
3. `ng update` if some packages are still outdated.

View dependencies: `nx dep-graph`.

## Architecture

### Organization

The planned architecture is:

- `apps/cadmus`: the frontend app.
- `libs/core`: core services and models.
- `libs/features`: app's features libraries, one for each page.
  - `<partgroup-feature>`: the pages for all the parts belonging to the specified group to be included in the app.
- `libs/material`: Angular material.
- `libs/parts`: Cadmus parts libraries, one for each group of parts. These only include models and dumb components.
  - `<partgroup>-ui`: core services and models plus dumb UI components for the part. E.g. `libs/parts/general-ui`.
- `libs/ui`: shared dumb UI components.

To include the part UI in your app, add a corresponding library for its page under `features`, where you will include the part's state and wrap its dumb editor component into the page.

### Adding Parts

To **add a new parts library**:

- create a new Nrwl Angular library named `<partgroup>-ui` under `parts/<partgroup>` (use simple module name in generator). For instance, for general purpose parts I created `parts/general/general-ui`.

To **add a new part**:

1. add the part model (derived from `Part`), its type ID constant, and its JSON schema constant to `models.ts`. For instance:

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
}
```

2. add a part editor *dumb* component named after the part (e.g. `NotePartComponent` after `NotePart`), and extending `PartEditorBaseComponent<T>` where `T` is the part's type.

3. add a part editor demo *dumb* component named after the part (e.g. `NotePartComponentDemo` after `NotePart`). This will essentially be a wrapper of two distinct controls: the part's editor component, and a `JsonEditorResourcesComponent`. These components are mutually connected, so that you can edit the JSON code for the part (and eventually for its thesauri sets) and set the visual editor to it, or vice-versa.

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Documentation with Compodoc

- <https://compodoc.app/>

Ensure that you have installed compodoc globally: `npm install -g @compodoc/compodoc`.

Generate the documentation for each project like this: `compodoc -p apps/demo/src/tsconfig.app.json -s`.

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@cadmus/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
