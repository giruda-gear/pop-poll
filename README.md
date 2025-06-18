# Monorepo Project

This repository is a monorepo setup using Nx with multiple apps and libs, demonstrating a typical modern TypeScript backend development environment with NestJS and MikroORM.

## Project Structure

- `apps/` – Application projects (e.g., `poll`)
- `libs/` – Shared libraries (e.g., `database` with entities and MikroORM config)
- `dist/` – Compiled output

## Tech Stack & Tools

- **Nx** — Monorepo build and task runner  
- **NestJS** — Backend framework  
- **MikroORM** — TypeScript ORM with PostgreSQL  
- **TypeScript** — Main language with `CommonJS` module system for compatibility  
- **pnpm** — Package manager  

## Setup & Usage

1. Install dependencies:  
```bash
   pnpm install
```
2.	Build shared libraries:
```bash
    nx build database
```
3.	Run application in development mode with Nx
```bash
    nx serve poll
```
4.	Configure environment variables for database connection (e.g., .env file).


## Notes

- CommonJS module system was chosen for compatibility with NestJS and MikroORM decorators.
- MikroORM entities are compiled into `dist/libs/database/src/entities`.
- The `temp/` folder contains MikroORM metadata cache files and should be ignored by Git.
- Nx caching can be skipped with the `--skip-nx-cache` flag during commands.
- Path mapping (`@database`) is used for cleaner imports.


## Troubleshooting

- **No entities were discovered error**:  
  Ensure that the compiled `.js` files for entities exist under the correct `dist` path specified in `mikro-orm.config.ts`. Also, verify `entities` and `entitiesTs` paths in the config.

- **MikroORM decorator metadata issues**:  
  Use `"module": "CommonJS"` and enable `"emitDecoratorMetadata": true` and `"experimentalDecorators": true` in `tsconfig.json`.

- **Nx caching issues**:  
  Use `nx reset` or add `--skip-nx-cache` flag to bypass cached outputs during development.

- **When to Use Webpack:**
  - Use webpack to bundle code for smaller deploy size and faster startup in serverless environments.
  - For local or traditional servers, `tsc` compile-only is sufficient and faster.
  - To enable webpack, set the build executor to `@nx/webpack:webpack` with a proper `webpack.config.js`.