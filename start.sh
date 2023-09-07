#!/bin/sh
npx prisma migrate deploy
node src/index.cjs
