# React + Express Starter Structure

This workspace is a clean starter structure for a full-stack application with a separate frontend and backend.

The project is intentionally split into two apps:

- `frontend/` for the React client
- `backend/` for the Express API
- `infrastructure/` for local dev tooling such as Docker, Postgres, and MinIO setup

This repo currently contains only the folder structure and placeholder files. There is no application logic, API integration, or database wiring yet.

## Folder Structure

```text
.
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/api/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── db/
│   │   ├── migrations/
│   │   └── seeds/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── storage/minio/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── tsconfig.json
└── infrastructure/
	└── docker/
```

## Architecture Overview

### Frontend

The frontend is organized by responsibility:

- `components/` for reusable UI parts
- `pages/` for route-level screens
- `features/` for business features grouped by domain
- `services/api/` for API client logic
- `hooks/`, `context/`, `utils/`, and `types/` for shared frontend code

### Backend

The backend follows a layered structure:

- `routes/` defines HTTP endpoints
- `controllers/` handles request and response flow
- `services/` contains business logic
- `models/` is reserved for database models or ORM entities
- `storage/minio/` is reserved for file bucket and object storage logic
- `db/migrations/` and `db/seeds/` are reserved for PostgreSQL schema and seed data

## How to Run

This scaffold does not include installed dependencies or runnable scripts yet. To run the project, you will need to add dependencies and scripts to each app first.

### 1. Install dependencies

From the project root, install packages separately for each app once their manifests are configured:

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 2. Add development scripts

Typical scripts for this structure are:

Frontend:

```bash
npm run dev
```

Backend:

```bash
npm run dev
```

### 3. Start local infrastructure

When you add Docker configuration for PostgreSQL and MinIO, start them from the `infrastructure/docker/` folder.

Example:

```bash
cd infrastructure/docker
docker compose up -d
```

## Current State & Next Steps

✅ **Frontend:** React + Vite is configured with TailwindCSS, shadcn/ui, React Router, and an optimized Axios client.
✅ **Backend:** Express is scaffolded with TypeScript and environmental configs.
✅ **Environment:** Base `.env` and `.env.example` exist for both frontend and backend.

**Next Steps for you:**
1. Populate PostgreSQL & MinIO Docker containers by creating `infrastructure/docker/docker-compose.yml`.
2. Build out API endpoints in `backend/src/routes` and link them to controllers.
3. Bring UI to life using `npx shadcn-ui@latest add <component>` in the frontend folder.

## Notes

- The frontend and backend are intentionally separated so they can be developed, deployed, and scaled independently.
- MinIO is reserved for object storage, such as file uploads and bucket-based assets.
- PostgreSQL is reserved for relational application data.
