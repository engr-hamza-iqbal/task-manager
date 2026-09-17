# Task Manager API

REST API for the Task Manager UI.

## Requirements

- Node.js 20+
- PostgreSQL

## Setup

From this directory:

```powershell
npm install
Copy-Item .env.example .env
```

Update `.env` with your PostgreSQL connection details and JWT secret:

```env
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/task_manager?schema=public"
PORT=3000
JWT_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:5173
```

`FRONTEND_URL` is the browser origin allowed by CORS. The Vite frontend runs on
port `5173` by default, so do not leave this set to `5174` unless the frontend
is actually running there. The value in `.env` overrides the fallback in
`src/app.js`.

Create/update the database and generate the Prisma client:

```powershell
npx prisma migrate dev
npx prisma generate
```

Optional seed command:

```powershell
node prisma/seed.js
```

## Run

Development server:

```powershell
npm run dev
```

The API runs at `http://localhost:3000`.

Useful endpoints:

- Swagger UI: `http://localhost:3000/api-docs/`
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Tasks: `/api/tasks`

Run tests with:

```powershell
npm test
```

## Frontend connection

The frontend uses Vite's `/api` proxy during development. Requests from the
browser go to `http://localhost:5173/api`, and Vite forwards them to
`http://localhost:3000/api`. This avoids a browser cross-origin request in
development.

If you use a direct API URL instead, create `task-manager-ui/.env` with:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

In that mode, the backend CORS `FRONTEND_URL` must exactly match the UI origin.