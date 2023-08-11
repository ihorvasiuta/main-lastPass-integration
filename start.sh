#!/bin/sh
npx prisma migrate deploy
node index.cjs