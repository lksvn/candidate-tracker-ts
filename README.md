# Candidate Tracker - TypeScript Lab

This folder contains the Candidate Tracker learning project, including its TypeScript backend foundations and Next.js web application.

The goal is to practice TypeScript, domain modeling, service boundaries, validation, async data flow, persistence, React, and Next.js through an incrementally built application.

## Current Focus

- Build narrow, user-visible Next.js vertical slices on the existing TypeScript foundation.
- Keep domain and repository contracts independent from Prisma-generated types.
- Map Prisma persistence shapes into application-owned domain and read-model types.
- Model Company and Job Opportunity as a PostgreSQL one-to-many relationship.
- Validate unknown data at Server Action boundaries before treating it as domain data.
- Keep fast unit tests separate from PostgreSQL integration tests.

## Folder Structure

```txt
src/
+-- app/
+   +-- companies/
+   +-- opportunities/
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

`CompanyRepository` has in-memory and Prisma/PostgreSQL implementations. `JobOpportunityRepository` currently has a Prisma/PostgreSQL adapter for creation and joined list reads.

### `repositories/`

Contains storage-independent repository contracts required by the application.

`CompanyRepository` supports listing, lookup, creation, and partial updates with consistent missing-record and nullable-field behavior. `JobOpportunityRepository` is intentionally narrower: it currently supports creation and listing opportunities with the related Company's ID and name.

### `app/`

Contains the Next.js App Router pages, forms, and Server Actions. Current browser-visible workflows include Company creation, listing, detail, and editing, plus a PostgreSQL-backed Job Opportunity list.

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
- Prisma/PostgreSQL enums and one-to-many relations.
- Foreign-key deletion rules and indexes on referencing columns.
- Prisma relation projections with `select` and `GetPayload`.
- Mapping database `null` values into domain-level optional values.
- PostgreSQL integration tests with isolated test data cleanup.
- Server Components and dynamic database-backed routes.
- React's default text escaping for untrusted content.
- `Promise.all` for independent async data loading.
- Staged async loading when later data depends on earlier data.

## Run Commands

Install dependencies:

```bash
npm install
```

Start the Next.js development server for everyday project work:

```bash
npm run dev
```

Open `http://localhost:3000` after the server starts.

Check TypeScript:

```bash
npm run check
```

Run the legacy TypeScript playground in `src/index.ts`:

```bash
npm run dev:legacy
```

Run tests:

```bash
npm run test -- --run
```

Run PostgreSQL integration tests:

```bash
npm run test:integration
```

Build and run the optimized production version locally:

```bash
npm run build
npm run start
```

`npm run start` requires a successful production build first. Use `npm run dev` during normal development.

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

After changing generated Prisma models, restart the Next.js development server. If stale generated code remains cached, stop the server, remove `.next`, and start it again.

Open Prisma Studio to inspect and edit local database records:

```bash
npx prisma studio
```

Prisma Studio requires the PostgreSQL container to be running and uses `DATABASE_URL` from `.env`.

## Next Step

Add the Job Opportunity creation workflow to the completed relational list slice.

Recommended targets:

- load persisted Companies as form options
- validate `FormData` as untrusted input
- create the opportunity through a Server Action and repository
- return field-level or form-level failures without losing user input
- revalidate the opportunity list after successful creation
- keep styling minimal and functional while product behavior is still growing

## Current Verification

- TypeScript check passes.
- Unit suite passes with 116 tests across 17 files.
- PostgreSQL integration suite passes with 9 tests across 2 files.
- Next.js production build passes, including the dynamic `/opportunities` route.
