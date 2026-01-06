# AI Coding Agent Instructions for Peternakan UMKM Platform

## Project Overview
Backend API for a livestock (peternakan) UMKM management platform built with **Express.js + TypeScript + PostgreSQL**. The system manages users, training programs, livestock, financing, and related documents for small-scale livestock farming businesses.

**Key Stack:** Node.js, Express 5, PostgreSQL, JWT auth, Swagger docs, Winston logging

---

## Architecture: Layered Clean Architecture

### Layer Structure
```
routes → controllers → services → repositories → database
```

**CRITICAL PATTERN:** Each entity (user, pelatihan, ternak, etc.) follows this exact 4-layer stack:
- **Routes** ([../src/routes/*.routes.ts](../src/routes)): HTTP endpoint definitions + Swagger JSDoc
- **Controllers** ([../src/controllers/*.controller.ts](../src/controllers)): Request handling, parameter extraction, delegation to services
- **Services** ([../src/services/*.service.ts](../src/services)): Business logic, error throwing, data validation
- **Repositories** ([../src/repositories/*.repository.ts](../src/repositories)): Raw database queries using `pg` client

### Data Flow Example
1. Request → `user.routes.ts` extracts params + validates middleware
2. Calls `user.controller.getUsers()`
3. Controller calls `service.getAllUsers()`
4. Service calls `repository.findAllUsers()`
5. Repository executes raw SQL via `db.query()`
6. Response flows back through layers with `successResponse()` helper

---

## Key Conventions & Patterns

### 1. Error Handling
- **Services throw `Error` objects** with descriptive messages (see [auth.service.ts](../src/services/auth.service.ts#L17))
- **Controllers catch and pass to `next(err)`** - global middleware handles response
- **Error handler** ([error.middleware.ts](../src/middlewares/error.middleware.ts)) maps errors:
  - `'Invalid credentials'` → 401
  - `'Email already registered'` → 400
  - Default → 500
- Add new error types to error middleware when needed

### 2. Response Format
All success responses use `successResponse(res, message, data, statusCode)` from [response.ts](../src/utils/response.ts):
```typescript
successResponse(res, 'User retrieved successfully', user, 200);
```
Returns: `{ status: 'success', message: string, data: any }`

### 3. Authentication
- JWT-based with Bearer token in `Authorization` header
- Token payload includes: `id`, `email`, `role`, `pelatihan_id`
- Two tokens: `accessToken` (15m) + `refreshToken` (7d) from [auth.service.ts](../src/services/auth.service.ts)
- Middleware: [auth.middleware.ts](../src/middlewares/auth.middleware.ts) - stores decoded user in `req.user`
- Apply to protected routes: `router.get('/:id', authenticate, getUser)`

### 4. Database Access
- PostgreSQL client from [config/database.ts](../src/config/database.ts) exported as `db`
- **Always use parameterized queries:** `db.query('SELECT * FROM users WHERE id = $1', [id])`
- Avoid string concatenation for security
- Repositories **never throw** - return null/false for missing data; services decide error response

### 5. Role-Based Access
- Enum type: `'peternak' | 'investor' | 'penyedia_kios' | 'admin'` (from [001_users_migration.sql](../src/database/migration/001_users_migration.sql))
- Role stored in JWT token and accessible via `req.user.role`
- Create authorization middleware if needed (template: [auth.middleware.ts](../src/middlewares/auth.middleware.ts))

### 6. Database Schema
- Uses auto-migration on startup (see [database.ts](../src/config/database.ts) logic)
- Migrations in [src/database/migration/](../src/database/migration) - numbered files run in order
- Seeders optional, in [src/database/seeder/](../src/database/seeder)
- Timestamp triggers auto-manage `created_at` and `updated_at`
- Main entities:
  - `users` (id, email, password, role, nomor_hp, otp_code, is_verified)
  - `umkm` (livestock business entities)
  - `ternak` (livestock records)
  - `pelatihan` (training programs)
  - `materi_pelatihan` (training materials)
  - `pembiayaan` (financing)
  - `dokumen_pembiayaan` (financing documents)
  - `progres_pelatihan` (training progress)

---

## Development Workflows

### Setup & Running
```bash
npm install
npm run dev                    # Start dev server on APP_PORT
npm run setup-db             # Initialize database schema
npm run migrate              # Run migrations
```

### Environment
Create `.env` file (see [database.ts](../src/config/database.ts) defaults):
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=clean_arch_db
APP_PORT=3000
JWT_SECRET=your-secret-key
```

### Adding New Entity
1. Create migration: [src/database/migration/NNN_tablename_migration.sql](../src/database/migration)
2. Create repository: `src/repositories/tablename.repository.ts` (follow [user.repository.ts](../src/repositories/user.repository.ts) pattern)
3. Create service: `src/services/tablename.service.ts` (wrap repo, throw errors)
4. Create controller: `src/controllers/tablename.controller.ts` (HTTP handling)
5. Create routes: `src/routes/tablename.routes.ts` (add Swagger JSDoc)
6. Register in [app.ts](../src/app.ts): `app.use('/api/tablename', tablenameRoutes)`

### Testing
- Manual via Swagger UI: http://localhost:3000/api-docs
- Scripts in [src/scripts/](../src/scripts) test specific features
- No Jest/unit tests currently configured

---

## Critical Integration Points

### Swagger Documentation
- JSDoc in route files (see [user.routes.ts](../src/routes/user.routes.ts#L20) for example)
- Generated by [docs/swagger.ts](../src/docs/swagger.ts)
- Served at `/api-docs` with no-cache headers
- Update JSDoc when changing endpoints

### Logging
- Winston logger in [utils/logger.ts](../src/utils/logger.ts)
- Error middleware logs all errors
- Morgan logs HTTP requests

### Rate Limiting
- Applied to all `/api/*` routes via [rateLimiter.middleware.ts](../src/middlewares/rateLimiter.middleware.ts)
- Uses `express-rate-limit` package
- Adjust limits in middleware if needed

### CORS
- Enabled for all origins in [app.ts](../src/app.ts) (origin: true)
- Change for production security

---

## Common Pitfalls to Avoid

1. **String concatenation in SQL** - Always use `$1`, `$2` placeholders
2. **Async/await without try-catch** - Services must throw, controllers catch
3. **Skipping Swagger docs** - Keep JSDoc updated for each endpoint
4. **Hardcoded magic numbers** - Use enums (like role types)
5. **Repository returning errors** - They return null/false; services decide messaging
6. **Forgetting JWT claims in token** - Include `id`, `email`, `role`, `pelatihan_id`

---

## File Reference Map

| Layer | Pattern | Examples |
|-------|---------|----------|
| Routes | `api/{entity}.routes.ts` with JSDoc | [user.routes.ts](../src/routes/user.routes.ts), [pelatihan.routes.ts](../src/routes/pelatihan.routes.ts) |
| Controllers | Handlers named `{get\|post\|put\|delete}{Entity}` | [user.controller.ts](../src/controllers/user.controller.ts) |
| Services | Business logic + error throwing | [auth.service.ts](../src/services/auth.service.ts) |
| Repositories | Raw queries + null returns | [user.repository.ts](../src/repositories/user.repository.ts) |
| Utils | Helpers: jwt, logger, response | [utils/jwt.ts](../src/utils/jwt.ts), [utils/response.ts](../src/utils/response.ts) |
