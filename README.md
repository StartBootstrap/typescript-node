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

## Prisma

<https://www.prisma.io/docs/concepts>

### Schema

`prisma/schema.prisma`

After making changes to schema, be sure to run:

```bash
npx prisma generate
```

This will update `node_modules/.prisma/client`

### Data Studio

```bash
npx prisma studio
```

### Starting from scratch

```bash
rm -rf prisma/migrations/20* && npx prisma migrate dev --name init
nr script -- scripts/prisma/seed-root.ts
nr script -- scripts/prisma/seed-test.ts
```
