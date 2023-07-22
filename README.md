This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

## prerequisite
Make sure you have [Docker](https://www.docker.com/) installed 

## Run Development Server
```
npm run dev
```
Above command will automatically create database as docker container before starting dev server. Be sure to remove it after stopping dev server
```
docker compose down
```

## Run E2E test
```
npm run e2e
```
