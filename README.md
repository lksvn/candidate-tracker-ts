# Candidate Tracker - TypeScript Lab

This folder contains the TypeScript-only phase of the Candidate Tracker learning project.

The goal is to practice TypeScript, domain modeling, service boundaries, validation, generics, utility types, and async data flow before adding React or a real database.

## Current Focus

- Model trusted domain objects with TypeScript types and interfaces.
- Keep business behavior in service functions.
- Validate business rules separately from TypeScript shape checks.
- Use repositories to simulate async data access.
- Use automated tests to protect helper, validation, and service behavior.
- Prepare the codebase for async repository tests and, later, database-backed repositories.

## Folder Structure

```txt
src/
+-- data/
+-- domain/
+-- services/
+-- shared/
+-- index.ts
tests/
+-- services/
+-- shared/
```

## Folders

### `domain/`

Contains the core business shapes.

Examples:

- `JobOpportunity`
- `Interview`
- `Client`
- `FreelanceOpportunity`
- `Project`

These files describe what valid domain objects look like once data is trusted.

### `services/`

Contains business behavior and validation.

Examples:

- create/update functions
- filtering functions
- validation functions
- project creation from a signed freelance opportunity

Services should not care where data comes from.

### `data/`

Contains seed data and repository-like functions.

The repositories currently return seed data, but they are shaped like async data access:

```ts
Promise<AsyncResult<T>>
```

This prepares the project for future database-backed implementations.

### `shared/`

Contains reusable helpers that are not specific to one domain concept.

Examples:

- `findById`
- `filterByProperty`
- `AsyncResult`
- `successResult`
- `failureResult`
- `handleResult`

### `index.ts`

Temporary playground file.

It runs examples for:

- services
- validations
- create/update flows
- async repository calls
- dashboard-style data loading

It is intentionally not production-clean yet.

## Important Concepts Practiced

- Automated tests with Vitest.
- Union types for controlled status values.
- Interfaces for domain objects.
- `Omit` for create input types.
- `Partial` for update input types.
- Generics for reusable helpers.
- `Promise<T>` and `await`.
- `AsyncResult<T>` for typed success/failure flows.
- `Promise.all` for independent async data loading.
- Staged async loading when later data depends on earlier data.

## Run Commands

Install dependencies:

```bash
npm install
```

Check TypeScript:

```bash
npm run check
```

Run the playground:

```bash
npm run dev
```

Run tests:

```bash
npm run test -- --run
```

## Next Step

Add tests for async repository behavior before moving to a database.

Recommended targets:

- repository functions returning `AsyncResult<T>`
- dashboard data loading
- success and failure branches
- dependent async loading
