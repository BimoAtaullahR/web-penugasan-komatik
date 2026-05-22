This repo is a monorepo with a Next.js frontend and an Express + Prisma backend.

## Prerequisites

- Node.js 18+
- Docker (for local Postgres)

## Setup

1) Install dependencies:

```bash
npm install
```

2) Create environment variables:

```bash
cp .env.example .env
```

3) Start the database:

```bash
docker compose up -d
```

4) Run Prisma migrations (push) and seed:

```bash
npm exec --workspace=backend -- npx prisma db push
npm exec --workspace=backend -- npx prisma db seed
```

## Run the apps

Frontend:

```bash
npm run dev:frontend
```

Backend:

```bash
npm run dev:backend
```

Open [http://localhost:3000](http://localhost:3000).

## Admin demo credentials

- Username: `admin`
- Password: `admin123`

## Auth notes

- API uses HTTP-only cookies for Admin session.
- Authorization header also supported: `Authorization: Bearer <token>`.
