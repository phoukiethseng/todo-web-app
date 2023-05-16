# **Setup development database using Docker container**

Before running `npm run dev`, you must setup development database first

- Run `postgres:14-alpine` container
- Run `Primsa` schema migration command
- (Optional) run `npm run seed` to fill initial dummy data OR you can connect container to existing volume

## Run Postgres docker container

---

```
docker run --name devdb -d \
-e POSTGRES_DB=devdb \
-e POSTGRES_PASSWORD=foo \
-p 8080:5432 \
postgres:14-alpine
```

Create postgres container with volume attached

```
docker create volume dbVol
```

```
docker run --name devdb \
-d \
--volume dbVol:/var/lib/postgresql/data \
-e POSTGRES_DB=devdb \
-e POSTGRES_PASSWORD=foo \
-p 8080:5432 \
postgres:14-alpine
```

## Database connection string

---

```
postgresql://postgres:foo@localhost:8080/devdb
```

## Prisma schema migration

---

```
DATABASE_URL=postgresql://postgres:foo@localhost:8080/devdb npx prisma migrate deploy
```

## Database seeding

---

```
DATABASE_URL=postgresql://postgres:foo@localhost:8080/devdb npm run seed
```
