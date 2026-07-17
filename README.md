# Candidate Tracker - TypeScript Lab

This folder contains the TypeScript and backend-foundation phases of the Candidate Tracker learning project.

The goal is to practice TypeScript, domain modeling, service boundaries, validation, generics, utility types, async data flow, and persistence foundations before adding React.

## Current Focus

- Model trusted domain objects with TypeScript types and interfaces.
- Keep business behavior in service functions.
- Validate business rules separately from TypeScript shape checks.
- Define repository contracts independently from their storage implementations.
- Implement the same repository contract with in-memory and Prisma/PostgreSQL adapters.
- Use automated tests to protect helper, validation, and service behavior.
- Validate unknown data at application boundaries before treating it as domain data.
- Keep fast unit tests separate from database integration tests.

## Folder Structure

```txt
src/
+-- data/
+   +-- database/
+   +-- repositories/
+   +-- validation/
+-- domain/
+-- repositories/
+-- services/
+-- shared/
+-- index.ts
tests/
+-- data/
+-- integration/
+-- services/
+-- shared/
prisma/
+-- migrations/
+-- schema.prisma
compose.yaml
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

Contains seed data, database configuration, concrete repository implementations, and runtime shape validators.

Repository operations return explicit success or failure values:

```ts
Promise<Result<T, RepositoryError>>
```

`CompanyRepository` currently has both in-memory and Prisma/PostgreSQL implementations.

### `repositories/`

Contains storage-independent repository contracts required by the application.

The first contract, `CompanyRepository`, is implemented by both in-memory and Prisma/PostgreSQL adapters without changing its callers. Both adapters support listing, lookup, creation, and partial updates with consistent missing-record and nullable-field behavior.

### `data/validation/`

Contains type guards for untrusted runtime input. These validators check data shape and field types; business-value rules remain in service validation.

### `shared/`

Contains reusable helpers that are not specific to one domain concept.

Examples:

- `findById`
- `filterByProperty`
- `Result`
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
- Repository contracts and in-memory adapters.
- Runtime type guards for `unknown` input.
- Union types for controlled status values.
- Interfaces for domain objects.
- `Omit` for create input types.
- `Partial` for update input types.
- Generics for reusable helpers.
- `Promise<T>` and `await`.
- `Result<T, E>` for typed success/failure flows.
- Prisma schema modeling and migrations.
- PostgreSQL integration tests with isolated test data cleanup.
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

Run PostgreSQL integration tests:

```bash
npm run test:integration
```

## Local PostgreSQL

The development database runs in Docker using `compose.yaml`. Copy the example connection configuration once:

```powershell
Copy-Item .env.example .env
```

Start PostgreSQL:

```bash
docker compose up -d database
```

Check container health:

```bash
docker compose ps
```

Stop the container without deleting its stored data:

```bash
docker compose stop database
```

The named Docker volume preserves database files between container restarts. The credentials in `.env.example` are intended only for local development; `.env` is ignored by Git.

## Prisma Commands

Validate the Prisma schema and configuration:

```bash
npx prisma validate
```

Format `schema.prisma`:

```bash
npx prisma format
```

Create and apply a development migration:

```bash
npx prisma migrate dev --name <migration-name>
```

Regenerate Prisma Client after schema changes:

```bash
npx prisma generate
```

Open Prisma Studio to inspect and edit local database records:

```bash
npx prisma studio
```

Prisma Studio requires the PostgreSQL container to be running and uses `DATABASE_URL` from `.env`.

## Next Step

Connect the completed Company write application layer to a real external-input boundary.

Recommended targets:

- validate unknown create/update input before it reaches typed use cases
- map application outcomes to boundary responses without leaking repository details
- revisit the existing pure create/update helpers now that persisted use cases exist
- expand the relational schema after the Company vertical slice is complete
