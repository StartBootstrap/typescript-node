# SB Backend Node

## Quick Start

```bash
git clone git@github.com:StartBootstrap/typescript-node.git
cd typescript-node
npm install
cp .env.sample .env
```

### Edit .env to match your local environment

- Be sure to add values for the strings starting with `CHANGE_ME__`

- Execute `## Prisma ### Starting from scratch` below

- If you hit issues with postgress relating to `uuid-ossp`, run this script: `npm run uuid:ossp`

## Prisma

<https://www.prisma.io/docs/concepts>

### Starting from scratch

```bash
rm -rf prisma/migrations/20* && npx prisma migrate dev --name init
nr script -- scripts/prisma/seed-root.ts
nr script -- scripts/prisma/seed-test.ts
```

### Data Studio

```bash
npx prisma studio
```
