# Database

Founder Intelligence uses **PostgreSQL** with **Prisma** as the ORM.

- Schema and migrations live in the backend: `../backend/prisma/`.
- To create the database and tables from your machine:

```bash
cd ../backend
cp .env.example .env
# Edit .env and set DATABASE_URL to your PostgreSQL connection string.

npx prisma generate
npx prisma db push
# Or for migrations: npx prisma migrate dev
```

- Connection string format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`
