/*
  Warnings:

  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "events";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "event_time" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
